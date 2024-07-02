import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { allImages } from '../../assets/assets'
import { Box, Image } from '@chakra-ui/react'
import useGetUserProfileById from '../../CustomHooks/useGetUserProfileById'

function FeedPost({post}) {
  const {userProfile} = useGetUserProfileById(post.createdBy)
 
  return (
    <>
     <PostHeader post={post} creatorProfile={userProfile}/>
     <Box my={2} borderRadius={7} overflow={"hidden"}>
        <Image src={post.imageURL}/>   
     </Box> 
     <PostFooter post={post} creatorProfile={userProfile} isProfilePage={false}/>
    </>
  )
}

export default FeedPost
