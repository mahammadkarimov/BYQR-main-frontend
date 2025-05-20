import React from "react"

export default function RootLayout({ children }) {
  return (
    <>
      <meta charSet="UTF-8" />
      <html lang="az">
        <body>{children}</body>
      </html>
    </>
  )
}

