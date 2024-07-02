import { Skeleton, VStack, Box, Grid, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProflePost from './ProflePost'
import useFetchUserPosts from '../../CustomHooks/useFetchUserPosts'
function ProfilePosts({ loading }) {

  const { isLoading, posts } = useFetchUserPosts()
  const noPostFound = !posts.length && !isLoading && !loading;

  if (noPostFound) return <NoPostsFound />
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)"
      }}
      gap={1}
      columnGap={1}
    >
      {
        isLoading || loading ?
          [0, 1, 2, 3, 4, 5].map((_, idx) => (
            <VStack key={idx} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h={"300px"}></Box>
              </Skeleton>
            </VStack>
          )) :
          <>

            {
              posts.map((post,idx) => (
                <ProflePost post={post} key={idx} />
              ))
            }

          </>
      }

    </Grid>
  )
}

export default ProfilePosts
const NoPostsFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Yet </Text>
    </Flex>
  );
};