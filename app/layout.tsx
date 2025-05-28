import type React from "react"
import "@/app/globals.css"
import localFont from "next/font/local"
import { LenisProvider } from "@/hooks/useLenisScroll"

// import ScrollProvider from "@/components/LocomotiveProvider"

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/CreatoDisplay-Medium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-customFont",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={myFont.variable} suppressHydrationWarning>
      <head />
      <body>
        {/* <ScrollProvider> */}
        <LenisProvider>
          {children}
        </LenisProvider>
        {/* </ScrollProvider> */}
      </body>
    </html>
  )
}
