import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, Image } from "@chakra-ui/react";
// import Login from "./Login"; // Replace with your actual login component
import Login from './Login';
import SignupForm from './Signup'; // Replace with your redesigned signup form component
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    // Define text variables for consistency
    const signUpText = "Don't have an account?";
    const logInText = "Already have an account?";

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            minHeight="100vh"
        >
            {isLogin ? (
                <Login />
            ) : (
                <SignupForm  />
            )}
          
            {/* Use ternary operator to display correct text based on isLogin state */}
            <Flex mt={!isLogin ? -23 : -67}>

            <Box  fontSize={14}>
                {isLogin ? signUpText : logInText}
            </Box>

                <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"} fontSize={14}>
                    {isLogin ? "Sign up" : "Log in"}
                </Box>
        
            </Flex>
        </Flex>
    );
};

export default AuthForm;
