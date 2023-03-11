import {Stack, Text,Button, Flex,FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import React, { useState } from 'react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from "axios";
import {signIn} from 'next-auth/react'


const EmailSignUp = () => {

    const [email, setEmail] =  useState()
    const [password, setPassword]  = useState()
    const [show, setShow]  = useState(false)

   
    const isEmailError = email === ''
    const isPasswordError = password === ''


    const okAuthentication = async() => {
/*         let options = {redirect: /, email, password}
 */        await signIn("credentials", {callbackUrl:'/', email: email, password: password})
    }

 
    const signUp = async() => {
        
    const result = await axios.post('http://localhost:3000/api/auth/signup', {email: email,
    password: password}).then(okAuthentication).catch(e => console.log(e)) }

    return(
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.50"}
      >        
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
          <Text fontSize={"4xl"} fontWeight={600}>
            Sign Up To Post Reviews
          </Text>
        </Stack>
        <Stack spacing={4}>

        <FormControl isRequired isInvalid={isEmailError}>
            <Flex>
            <FormLabel> Email</FormLabel>
            </Flex>
            <InputGroup size='md'>
            <Input focusBorderColor = 'blue' errorBorderColor = 'red' type='text'
             value={email} onChange={(e) => {setEmail(e.target.value)}} /> 
            </InputGroup>

            <>
            {isEmailError ? (
                <FormHelperText>
                </FormHelperText>
            ) :(
                <FormErrorMessage> Email is required.</FormErrorMessage>
            )}  
            </> 
        </FormControl>

       <FormControl isRequired isInvalid={isPasswordError}>
        <FormLabel> Password</FormLabel>
        <InputGroup size='sm'>
       <Input focusBorderColor = 'blue' errorBorderColor = 'red' type={ show ? 'text' : 'password'} 
        value={password} onChange={(e) => {setPassword(e.target.value)}} />
       <InputRightElement onClick={() => setShow(!show)}>
        {show ? <ViewOffIcon/> : <ViewIcon/>} 
       </InputRightElement>
       </InputGroup>

        <FormErrorMessage>  Please input the password</FormErrorMessage>
        </FormControl> 

        </Stack>

        <Button marginTop = '5%'  bg={"blue.400"}
                  color={"white"}
                  _hover={{bg: "blue.500",}} onClick={signUp}> Sign Up </Button>
        </Stack>

        </Flex>
      
    )
}

export default EmailSignUp;