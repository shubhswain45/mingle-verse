import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../Components/ProfilePages/ProfileHeader";
import ProfileTabs from "../../Components/ProfilePages/ProfileTabs";
import ProfilePosts from "../../Components/ProfilePages/ProfilePosts";
import useGetUserProfileByUsername from "../../CustomHooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
	const { username } = useParams();

	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	const userNotFound = !isLoading && !userProfile;
	if (userNotFound){
    return <UserNotFound />;

  } 

	return (
		<Container maxW='container.lg' py={5}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
				{isLoading && <ProfileHeaderSkeleton />}
				{!isLoading && userProfile && <ProfileHeader />}
			</Flex>

			
				<Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={"whiteAlpha.300"}
				direction={"column"}
			>
				<ProfileTabs />
				<ProfilePosts loading={isLoading}/>
			</Flex>
			
		
		</Container>
	);
};

export default ProfilePage;

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='32' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='14px' width='150px' />
				<Skeleton height='14px' width='100px' />
				<Skeleton height='14px' width='100px' />
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mt={300}>
			<Text fontSize={"2xl"}>Sorry, this page isn't available.</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};