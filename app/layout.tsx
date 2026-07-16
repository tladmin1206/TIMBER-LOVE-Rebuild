import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import ModalProvider from '@/components/ui/ModalProvider';
import Modals from '@/components/ui/Modals';
import Analytics from '@/components/Analytics';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/schema';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
        url: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg',
        width: 1000,
        height: 1000,
        alt: 'Timber and Love Design Build Premier Home Remodeling Contractors in Boise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Timber and Love | Boise's Premier Home Services by HGTV's Luke Caldwell",
    description: site.description,
    images: ['/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg'],
  },
  icons: {
    icon: '/wp-content/uploads/2024/03/Timber-And-Love-Icon-White-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys-300x126.png',
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
          <main id="content">{children}</main>
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
