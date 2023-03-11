import Link from 'next/link';
import { Flex, Box, Text, Button, Image } from '@chakra-ui/react';
import {useSession , signIn, signOut} from 'next-auth/react'


const Navbar = () => {
    const {data: session} = useSession()
   

  return (
    <Flex zIndex={10} position = 'fixed' top={0} left = {0} w="full" bgColor='#e8c599'  boxShadow="md"  textAlign="left"  variant="nav" marginBottom='10%'
             >
       <Flex width = "container.xl" m="auto" p="5" minW = "100vw"
       justifyContent="space-between" textAlign='right'>
         <Image src='/icon2.png' boxSize='5%' />
           <Link href="/" passHref>
                 <Flex > 
               <Text as='b' fontSize = {{ base: '24px', md: '40px', lg: '56px' }}  letterSpacing={24}> 
                VINTAGE CINEMA
              </Text> 
               </Flex>

           </Link>      
           {  session? 
          <Box>
                <Button  onClick={() => signOut()}> Log Out</Button>
            </Box> :
            <Box> 

            <Link href='/auth/emailSignUp' margin = '10px'  > <Button> Sign Up</Button>  </Link>

            <Button  onClick = {() => signIn()}> Log In</Button> 
            </Box>
            }
           
       </Flex>
   </Flex>
  )
}

export default Navbar