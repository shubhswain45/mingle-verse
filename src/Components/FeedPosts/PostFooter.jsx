import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

import { CommentIcon, UnlikeIcon, LikeIcon } from '../../assets/constant';
import usePostComment from '../../CustomHooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLike from '../../CustomHooks/useLike';
import { timeAgo } from '../../utils/timeAgo';
import useShowToast from '../../CustomHooks/useShowToast';
import CommentsModal from '../Comment/CommentModel';


function PostFooter({ post, isProfilePage, createrProfile }) {

  const { isCommenting, handlePostComment } = usePostComment()
  const [comment, setComment] = useState('')
  const { user } = useAuthStore()
  const commentRef = useRef(null)
  const { isLiked, likes, handleLikes, isLiking } = useLike(post)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast()


  const handleSubmitComment = async () => {
    if(comment.length > 700) {
      showToast("Error", "The Comment is Too Large", "error")
      return;
    }
    await handlePostComment(post.id, comment)
    setComment('')
  }


  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4} ml={-5} >
        <Button onClick={handleLikes} cursor={"pointer"} isLoading={isLiking} bg={"transparent"} _hover={{ bg: "transparent" }}>
          {!isLiked ? < UnlikeIcon size={20} /> : <LikeIcon color={"#f01a33"} size={20} />}
        </Button>
        <Box cursor={"pointer"} fontSize={20} onClick={() => commentRef.current.focus()}>
          <CommentIcon />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"} mt={-3}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize='12' color={"gray"}>
          Posted {timeAgo(post.createAt)}
        </Text>
      )}

      {
        isProfilePage && <>
          <Text fontSize={"sm"} fontWeight={700}>
            {createrProfile?.username}
            <Text as={"span"} fontWeight={400}>
              {post.caption}
            </Text>
          </Text>

        </>
      }
      {
        !isProfilePage && (

          post.comments.length > 0 && (
            <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} _hover={{color:"#c1c9c4"}} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
          )

        )
      }

      {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}

      {
        user && <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input ref={commentRef} variant={"flushed"} placeholder='Add a comment' fontSize={14} onChange={(e) => setComment(e.target.value)} value={comment} />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      }
    </Box>
  )
}

export default PostFooter
