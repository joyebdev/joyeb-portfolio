import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ClientOverlays from '@/components/common/ClientOverlays';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import DynamicFavicon from '@/components/common/DynamicFavicon';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { lenisOptions } from '@/lib/lenis';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import type { Viewport } from 'next';

import './globals.css';

export const metadata = getMetadata('/');

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#FFD700' },
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon-light.png?v=3" sizes="any" />
        </head>
        <body className={`font-hanken-grotesk overflow-x-hidden antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ReactLenis root options={lenisOptions}>
              <DynamicFavicon />
              <Navbar />
              {children}
              <ClientOverlays />
              <Footer />
              <UmamiAnalytics />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
