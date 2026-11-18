import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { ogCards, ogCardFor } from '@/lib/og-cards';

/**
 * Social sharing image for every page, at the standard 1200x630.
 *
 * /og/ is the homepage card, /og/about/ the About card, and so on: the path
 * after /og mirrors the page. Each card is the page's own photograph with the
 * Timber + Love mark, a short label, and the headline in Montserrat, on the
 * brand's ink ground.
 *
 * Cards are prerendered at build time (see generateStaticParams), so sharing a
 * link never waits on an image being drawn. Everything a card needs (fonts,
 * logo, photograph) is read from the repository, never from another host.
 *
 * Output is JPEG, not the PNG ImageResponse produces: a photographic card is
 * around 150 KB as a JPEG and well over 1 MB as a PNG, and several messaging
 * apps skip the preview for large images.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-static';

const WIDTH = 1200;
const HEIGHT = 630;
const INK = '#0B0B0C';
const CREAM = '#FAFAFA';
const LOGO = 'public/wp-content/uploads/2024/03/Timber-And-Love-Icon-White-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

export function generateStaticParams() {
  return Object.keys(ogCards).map((path) => ({ slug: path.split('/').filter(Boolean) }));
}

const asset = (path: string) => readFile(join(process.cwd(), path));

/** Headline size steps down as the headline gets longer, so it always fits. */
function titleSize(title: string, narrow: boolean): number {
  const n = title.length;
  if (narrow) return n <= 16 ? 64 : n <= 30 ? 52 : n <= 52 ? 42 : n <= 70 ? 36 : 31;
  return n <= 16 ? 88 : n <= 30 ? 68 : n <= 46 ? 56 : n <= 64 ? 46 : 38;
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await ctx.params;
  const path = slug.length ? `/${slug.join('/')}/` : '/';
  const card = ogCardFor(path);

  const source = sharp(await asset(`public${card.image}`), { failOn: 'none' }).rotate();
  const meta = await source.metadata();
  // A portrait photograph (usually of people) would lose heads if cropped to
  // a wide frame, so it sits whole in a panel on the right instead.
  const split = (meta.height ?? 0) > (meta.width ?? 1) * 1.05;
  const photoWidth = split ? 450 : WIDTH;
  const photo = await source
    .resize(photoWidth, HEIGHT, { fit: 'cover', position: card.position ?? (split ? 'top' : 'centre') })
    .jpeg({ quality: 86 })
    .toBuffer();

  const [logo, light, medium] = await Promise.all([
    asset(LOGO),
    asset('app/fonts/Montserrat-Light.ttf'),
    asset('app/fonts/Montserrat-Medium.ttf'),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`;
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  const copy = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: split ? '60px 56px 56px 64px' : '60px 64px 56px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={131} height={55} alt="" />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontFamily: 'Montserrat', fontWeight: 500, fontSize: 22, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(250,250,250,0.78)' }}>
          {card.eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            maxWidth: split ? 620 : 800,
            fontFamily: 'Montserrat',
            fontWeight: 300,
            fontSize: titleSize(card.title, split),
            lineHeight: 1.1,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: CREAM,
          }}
        >
          {card.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 34 }}>
          <div style={{ display: 'flex', width: 56, height: 1, backgroundColor: 'rgba(250,250,250,0.55)' }} />
          <div style={{ display: 'flex', marginLeft: 18, fontFamily: 'Montserrat', fontWeight: 500, fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(250,250,250,0.72)' }}>
            timberandlove.com
          </div>
        </div>
      </div>
    </div>
  );

  const image = new ImageResponse(
    split ? (
      <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: INK }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: WIDTH - photoWidth, height: '100%' }}>{copy}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={photoWidth} height={HEIGHT} alt="" />
      </div>
    ) : (
      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', backgroundColor: INK }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={WIDTH} height={HEIGHT} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
        {/* Ink weighted to the left and the floor, where the copy sits. The
            right of the photograph is left clear. */}
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: WIDTH, height: HEIGHT, backgroundImage: 'linear-gradient(90deg, rgba(11,11,12,0.93) 0%, rgba(11,11,12,0.80) 34%, rgba(11,11,12,0.34) 64%, rgba(11,11,12,0.06) 100%)' }} />
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: WIDTH, height: HEIGHT, backgroundImage: 'linear-gradient(0deg, rgba(11,11,12,0.72) 0%, rgba(11,11,12,0) 48%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: 0, left: 0, width: WIDTH, height: HEIGHT }}>{copy}</div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Montserrat', data: light, weight: 300, style: 'normal' },
        { name: 'Montserrat', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await image.arrayBuffer())).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' },
  });
}
