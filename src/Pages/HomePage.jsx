import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from '../Components/FeedPosts/FeedPosts'
import Suggestedusers from '../Components/SuggestedUsers/Suggestedusers'

function HomePage() {
  return (
    <Container maxW={"container.1g"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts/>
        </Box>
        <Box flex={3} mr={20}
          display={{base:"none", lg:"block"}}
          maxW={"300px"}
        >
          <Suggestedusers/>
        </Box>
      </Flex>
    </Container>
  )
}

export default HomePage
