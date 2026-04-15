import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    default: "PGNear.me",
    template: "%s | PGNear.me",
  },
  description: 'PGNear.me — Survey findings from 725 people on the PG hunting experience in India.',
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/logo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: "/logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}
      <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-RZ3M41NW07`}
            async
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RZ3M41NW07', {
              page_path: window.location.pathname,
              transport_type: 'beacon'
            });
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}
