import { Container, Flex, Skeleton, SkeletonCircle, VStack, Box, Button, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FeedPost from './FeedPost';
import { allImages } from '../../assets/assets';
import useGetFeedPosts from '../../CustomHooks/useGetFeedPosts';

function FeedPosts() {
  const {isLoading, posts} = useGetFeedPosts()
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, [posts])

  return (
    <Container maxW="container.sm" py={10} px={2}>
      {
        (isLoading  || loading) && (
          [0, 1, 2].map((item) => (
            <VStack key={item} spacing={4} alignItems="flex-start" mb={10}>
              <Flex gap={2} mt={2}>
                <SkeletonCircle size='12' />
                <VStack spacing={2} alignItems="flex-start" mt={3}>
                  <Skeleton height="10px" w="200px" />
                  <Skeleton height="10px" w="150px" />
                </VStack>
              </Flex>
              <Skeleton w="full">
                <Box h="400px"></Box>
              </Skeleton>
            </VStack>
          )))
       
      }

      {
        !isLoading && !loading && posts.length && (
          posts.map((post) => (
            <FeedPost post={post} key={post.id}/>
          ))
        )
      }
       {
        !isLoading && !loading && !posts.length && (
          <NoFollowingMessage/>
        )
       }
    </Container>
  );
}

export default FeedPosts;

import { FaUserPlus } from "react-icons/fa";

const NoFollowingMessage = () => {
    return (
        <Flex 
            direction="column" 
            align="center" 
            justify="center" 
            h="full" 
            textAlign="center"
            p={8}
        >
            <VStack spacing={4}>
                <Box 
                    p={4}
                    bg="blue.50"
                    borderRadius="md"
                    border="1px"
                    borderColor="blue.100"
                    w={{ base: "100%", sm: "400px" }}
                >
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                        You're not following anyone yet!
                    </Text>
                    <Text mt={2} fontSize="lg" color="gray.600">
                        Start following your friends to see their posts here.
                    </Text>
                </Box>
             
            </VStack>
        </Flex>
    );
};
