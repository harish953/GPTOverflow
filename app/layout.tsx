import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Inter, Space_Grotesk } from 'next/font/google' // @ts-ignore
import type { Metadata } from 'next'
// import "./globals.css";
import './globals.css'
import { ThemeProvider } from '@/context/themeProvider'

// import whyDidYouRender from "@welldone-software/why-did-you-render";

export const metadata: Metadata = {
  title: 'GPTOverflow',
  description:
    'A community driven platform for asking and answering questions.Get Help ,share knowledge and collaborate with developers around the world',
  icons: {
    icon: '/public/assets/icons/site-logo.svg',
  },
}
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
