

import { extendTheme } from '@chakra-ui/react'
import localFont from 'next/font/local'

/** Main font */
export const Helvetica = localFont({
  src: [
    { path: '../../public/fonts/1489452/7ce0a2f5-eb00-46aa-919c-5b3f3667646c.woff2' },
    { path: '../../public/fonts/1489452/cad22c74-45b4-4c49-9e6a-0cd3768a7bc7.woff' },
  ],
  variable: '--font-helvetica',
})

export const colors = {
  black: '#000000',
  white: '#ffffff',
}

export const theme = extendTheme({
  fonts: {
    heading: `${Helvetica.style.fontFamily}`,
    body: `${Helvetica.style.fontFamily}`,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
})
