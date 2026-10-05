import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import HeaderOffset from '@/components/layout/HeaderOffset';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import ModalProvider from '@/components/ui/ModalProvider';
import Modals from '@/components/ui/Modals';
import Analytics from '@/components/Analytics';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/schema';

// Ship the brand font with the app so publishing never needs a Google Fonts fetch.
const montserrat = localFont({
  src: './fonts/Montserrat-latin-variable.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Timber and Love | Boise's Premier Home Services by HGTV's Luke Caldwell",
    template: '%s - Timber and Love',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: 'Timber and Love' }],
  creator: 'Timber and Love',
  publisher: 'Timber and Love',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: "Timber and Love | Boise's Premier Home Builder by HGTV's Luke Caldwell",
    title: "Timber and Love | Boise's Premier Home Services by HGTV's Luke Caldwell",
    description: site.description,
    images: [
      {
        url: '/og/',
        width: 1200,
        height: 630,
        alt: 'Timber and Love',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Timber and Love | Boise's Premier Home Services by HGTV's Luke Caldwell",
    description: site.description,
    images: ['/og/'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <JsonLd schema={[organizationSchema, websiteSchema, localBusinessSchema]} />
        <a href="#content" className="skip-link">Skip to content</a>
        <ModalProvider>
          <Header />
          <HeaderOffset />
          {/* Bottom padding clears the fixed mobile action bar so the last
              element of every page, now always a CTA, is never covered. */}
          <main id="content" className="pb-[calc(48px+env(safe-area-inset-bottom))] xl:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomBar />
          <Modals />
        </ModalProvider>
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
