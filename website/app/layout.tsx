import { ChakraProvider } from '@chakra-ui/react'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode;}>) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      </head>
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}

export default RootLayout
