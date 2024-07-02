import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../Components/AuthForms/AuthForm";

const AuthPage = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left hand-side */}
			

					{/* Right hand-side */}
				
						<AuthForm />
				
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;