import { Flex, VStack, Text, Box } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import Suggesteduser from './Suggesteduser'
import useGetSuggestedUser from '../../CustomHooks/useGetSuggestedUser'

function Suggestedusers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUser()

  if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {
        suggestedUsers.length && <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
            See All
          </Text>
        </Flex>
      }

      {
        suggestedUsers.map((user) => (
          <Suggesteduser user={user} key={user.uid} avatar={user.profilePicURL} followers={user.followers.length} name={user.username} uid={user.uid} />
        ))
      }

    </VStack>
  )
}

export default Suggestedusers
