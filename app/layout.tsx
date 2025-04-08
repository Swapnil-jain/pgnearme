import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "PGNear.me",
    template: "%s | PGNear.me",
  },
  description: 'Find PG accommodations near you',
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
      <body>{children}</body>
    </html>
  )
}
