import { Box, Heading, FormControl, FormLabel, Input, Button, Image, InputGroup, InputRightElement, Flex } from '@chakra-ui/react';
import { allImages } from '../../assets/assets';
import { useColorModeValue } from '@chakra-ui/react';
import useSignUpWithEmailAndPassword from '../../CustomHooks/useSignUpWithEmailAndPassword';
import { useState } from 'react';
import { ShowIcon, HideIcon } from '../../assets/constant';
import GoogleAuth from './GoogleAuth';

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      color="#fff"
      px={4}
    >
      <Box
        maxW="400px"
        w="100%"
        p={8}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Box mb={6} position="relative">
          <Image src={allImages.logo} alt="Logo" maxW="200px" mx="auto" />
          <Heading as="h1" size="xl" mt={0} >
            Create an account
          </Heading>
        </Box>

        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            color="#fff"
            bg="transparent"
            borderColor="#555"
            _placeholder={{ color: '#888' }}
            mt={2}
            required
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            placeholder="Enter your username"
            color="#fff"
            borderColor="#555"
            bg="transparent"
            _placeholder={{ color: '#888' }}
            mt={2}
            required
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup mt={2}>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              bg="transparent"
              color="#fff"
              borderColor="#555"
              _placeholder={{ color: '#888' }}
              required
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <InputRightElement>
              <Button size="sm" onClick={handleShowClick} variant="ghost">
                {showPassword ? <ShowIcon size={50} /> : <HideIcon size={50} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme={"blue"}
          variant="solid"
          width="100%"
          mt={6}
          _hover={{ bg: '#5dacc9' }}
          onClick={() => signup(inputs)}
          isLoading={loading}
        >
          Sign Up
        </Button>
        {/* {error && <Box color="red.500" mt={4}>{error.message}</Box>} */}
      <Flex mt={5}>

        <GoogleAuth />
      </Flex>
      </Box>
    </Box>
  );
}

export default SignupPage;
