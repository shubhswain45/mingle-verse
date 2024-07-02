import { Box, Heading, FormControl, FormLabel, Input, Button, Image, Flex } from '@chakra-ui/react';
import { allImages } from '../../assets/assets';
import { useColorModeValue } from '@chakra-ui/react';
import useLogin from '../../CustomHooks/useLogin';
import { useState } from 'react';
import GoogleAuth from './GoogleAuth';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });
  const { loginUser, error, loading } = useLogin();

  return (

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="#fff" // Text color
      px={4}
    >
      <Box
        maxW="400px"
        w="100%"
        p={8}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Box mb={6} position="relative">
          <Image src={allImages.logo} alt="Logo" maxW="200px" mx="auto" />
          <Heading as="h1" fontSize={30} mt={0}>
            Log in to your account
          </Heading>
        </Box>


        <FormControl >
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            bg="transparent"
            color="#fff"
            borderColor="#555"
            _placeholder={{ color: '#888' }}
            mt={2}
            required
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>


        <FormControl mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            bg="transparent"
            color="#fff" // Input text color
            borderColor="#555" // Input border color
            _placeholder={{ color: '#888' }} // Placeholder text color
            mt={2}
            required
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </FormControl>

        <Button
          colorScheme={"blue"}
          variant="solid"
          width="100%"
          mt={6}
          _hover={{ bg: '#5dacc9' }}
          onClick={() => loginUser(inputs)}
          isLoading={loading}
        >
          Log in
        </Button>
        <Flex mt={5}>

          <GoogleAuth />
        </Flex>
      </Box>
    </Box>
  )
}

export default Login;
