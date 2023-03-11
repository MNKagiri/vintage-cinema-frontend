import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../Components/Navbar'
import {SessionProvider} from 'next-auth/react'
import localFont from '@next/font/local'
import '../styles/globals.css'

const officialFont = localFont({ src: '../fonts/NordinRegular.otf'})

function MyApp({ Component, pageProps: {session , ...pageProps}, }) {

  return ( 
    <SessionProvider session={session} >
 <ChakraProvider >
  <main className={officialFont.className}>
   <Navbar/> 
 <Component {...pageProps} />
 </main>
 </ChakraProvider>
 </SessionProvider>
 )
}

export default MyApp
