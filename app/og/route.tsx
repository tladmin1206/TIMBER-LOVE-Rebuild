import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Default social sharing image: the light Timber and Love wordmark centered on
 * the brand's near-black background (ink, #0B0B0C). Generated at the standard
 * 1200x630 Open Graph size so link previews on every platform read as the brand
 * rather than a cropped photo.
 *
 * The logo is read from the committed brand asset and embedded as a data URI so
 * the render never depends on an external host.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-static';

const WIDTH = 1200;
const HEIGHT = 630;

// Logo native size 1234x860 (ratio ~1.435). Sized to leave generous margins.
const LOGO_WIDTH = 620;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 860) / 1234); // ~432

export async function GET() {
  const logo = await readFile(join(process.cwd(), 'public/brand/timber-and-love-logo-white.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0B0C',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="Timber and Love" />
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );
}
