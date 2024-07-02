import { Avatar, AvatarGroup, Flex, VStack, Text, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { allImages } from '../../assets/assets'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import EditUserProfile from '../EditUserProfile/EditUserProfile'
import useFollowOrUnfollowUser from '../../CustomHooks/useFollowOrUnfollowUser'

function ProfileHeader() {
  const { userProfile } = useUserProfileStore()
  const { user } = useAuthStore()
  const { isUpdating, isFollowing, handleFollowUser }= useFollowOrUnfollowUser(userProfile?.uid)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ifAuthUserProfile = user?.username === userProfile.username;
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
      <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
        {
          userProfile.profilePicURL !== "" ? <Avatar src={userProfile?.profilePicURL} /> :  <Avatar src='' bg={"gray.400"}/>
        }
        
      </AvatarGroup>


      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={'center'}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>

          {ifAuthUserProfile &&
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button onClick={onOpen} bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
                Edit Profile
              </Button>
            </Flex>}

          {!ifAuthUserProfile &&
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button isLoading={isUpdating} onClick={handleFollowUser} bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
                { isFollowing ?  "Unfollow" : "Follow"}
              </Button>
            </Flex>}
        </Flex>

        <Flex alignItems={"center"} gap={{ base: "2", sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
            Post
          </Text>

          <Text>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
            Followers
          </Text>

          <Text>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
            Following
          </Text>

        </Flex>

        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.bio}</Text>
        </Flex>
        <Text fontSize={"sm"}>as a programmer</Text>
      </VStack>
      {isOpen && <EditUserProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  )
}

export default ProfileHeader
