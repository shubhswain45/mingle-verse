import {
  Flex, GridItem, Text, Image, useDisclosure, Box, Avatar, Divider, VStack, Button,
  useColorModeValue, Icon, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Modal
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { InfoIcon } from '@chakra-ui/icons';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import useAllPostStore from '../../store/AllPostStore';
import useShowToast from '../../CustomHooks/useShowToast';
import { firestore, storage } from '../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Caption from '../Comment/Caption';

function ProflePost({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile, decreamentPostCount } = useUserProfileStore();
  const { user } = useAuthStore();
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [shouldShowConfirmationWindow, setShouldShowConfirmationWindow] = useState(false);

  const { deletePost } = useAllPostStore();

  console.log(post);
  const handleDeletePost = async () => {
    setIsDeleting(true);
    if (isDeleting) return; 

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", user.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decreamentPostCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
      setShouldShowConfirmationWindow(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"whiteAlpha.400"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={post.imageURL} objectFit={"cover"} h={"100%"} w={"100%"} />
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"#1A202C"} pb={5}>
            <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                mt={3}
                maxH={'600'}
              >
                <Image src={post.imageURL}  h={'600'} w={"auto"} mx={'auto'} objectFit={"cover"} />
              </Box>
              <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex>
                    <Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
                    <Text fontWeight={"bold"} fontSize={12} mt={1} ml={3}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  <Box _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1}>
                    {user?.uid === userProfile.uid && (
                      <Button
                        size={"sm"}
                        bg={"transparent"}
                        _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                        borderRadius={4}
                        p={1}
                        onClick={() => setShouldShowConfirmationWindow(true)}
                        isLoading={isDeleting}
                      >
                        <MdDelete size={20} cursor='pointer' />
                      </Button>
                    )}
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  {
                    post.caption && <Caption post={post}/>
                  }
                  {
                    post.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment}/>
                    ))
                  }
                </VStack>
                <PostFooter isProfilePage={true} post={post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      {shouldShowConfirmationWindow && (
        <ConfirmationWindow
          onClose={() => setShouldShowConfirmationWindow(false)}
          onConfirm={handleDeletePost}
        />
      )}
    </>
  );
}

export default ProflePost;

function ConfirmationWindow({ onClose, onConfirm }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
            p={4}
            boxShadow="lg"
          >
            <Box display="flex" alignItems="center">
              <Icon as={InfoIcon} w={6} h={6} color="teal.500" />
              <Text fontWeight="bold" fontSize="xl" ml={2}>
                Delete Post?
              </Text>
            </Box>
            <Text mt={4} color={textColor}>
              Are you sure you want to delete this post? This action cannot be undone.
            </Text>
            <Flex mt={4} justifyContent="flex-end">
              <Button onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm}>
                Delete
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
