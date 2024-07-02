import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Image,
  VStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Input,
  Tooltip,
  Flex,
  CloseButton,
} from '@chakra-ui/react';
import { CreateIcon } from '../../assets/constant';
import usePreviewImg from '../../CustomHooks/useSelectImageFromFile';
import useShowToast from '../../CustomHooks/useShowToast';
import useAuthStore from '../../store/authStore';
import useAllPostStore from '../../store/AllPostStore';
import useUserProfileStore from '../../store/userProfileStore';
import { useLocation } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg()
  const {isLoading, handleCreatePost} = useCreatePost()
  const showToast = useShowToast()
  const {posts} = useAllPostStore()
  console.log("postsdssssss", posts);

  const handlePostCreate = async() => {
    // Handle post submission
    try {
		await handleCreatePost(selectedFile, caption);
		onClose()
		setCaption("")
		setSelectedFile(null)
	} catch (error) {
		showToast("Error", error.message, "error")
	}
  };

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      	<Tooltip
			hasArrow
			label={"Create"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			    <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    mx={"auto"}
                    onClick={onOpen}
                >
                    <CreateIcon size={25} />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
		</Tooltip>


      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'gray.700')} boxShadow="xl" borderRadius="lg" p="4">
          <ModalHeader fontSize="2xl" fontWeight="bold">Create New Post</ModalHeader>
          <ModalCloseButton size="lg" onClick={() => (setSelectedFile(null), onClose())} />
          <ModalBody>
            <VStack spacing="5">
              <FormControl>
                <FormLabel fontSize="lg">Caption</FormLabel>
                <Textarea 
                  placeholder="What's on your mind?" 
                  size="md" 
                  resize="none"
				  border={"1px solid"}
				  borderColor={"dark"}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="lg">Upload Image</FormLabel>
                <Box textAlign="center">
                  <IconButton
                    icon={<Image src={"https://cdn.iconscout.com/icon/free/png-256/free-gallery-187-902099.png?f=webp"} boxSize="6" objectFit={"cover"}/>}
                    aria-label="Upload Image"
                    onClick={() => fileInputRef.current.click()}
                    borderRadius="full"
                    variant="outline"
                    borderColor={"white"}
                    size="lg"
                  />
                  <Input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    display="none"
                    onChange={handleImageChange}
						
                  />
                </Box>
              </FormControl>
			  {selectedFile && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedFile} alt='Selected img' height={"190px"}/>
							</Flex>
				)}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              borderRadius="full"
              px="6"
              py="3"
			  onClick={handlePostCreate}
			  isLoading={isLoading}
            >
              Post
            </Button>
            <Button 
              variant="outline" 
              onClick={() => (setSelectedFile(null), onClose())}
              borderRadius="full"
              px="6"
              py="3"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;


function useCreatePost() {
	const showToast = useShowToast()
	const [isLoading, setIsLoading] = useState(false)
	const authUser = useAuthStore(state => state.user)
	const createPost = useAllPostStore(state => state.createPost)
	const addPost = useUserProfileStore(state => state.addPost)
  const {userProfile} = useUserProfileStore()

	const {pathname} = useLocation()

	const handleCreatePost = async(selectedFile, caption) => {
    if(isLoading) return;
		if(!selectedFile){
      showToast("Error", "Please Select a Image First !", "error")
      return;
    } 
		setIsLoading(true)
		const newPost = {
			caption:caption,
			likes: [],
			comments: [],
			createAt:Date.now(),
			createdBy: authUser.uid,
		}

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"),newPost);
			const userDocRef = doc(firestore,"users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);
			
			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");

			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;
      if(userProfile.uid === authUser.uid ) createPost({ ...newPost, id: postDocRef.id });
			if(pathname !== '/' && userProfile.uid === authUser.uid ) addPost({...newPost,id:postDocRef.id});
			showToast("Success", "Post created succesfully", "success");


		} catch (error) {
			showToast("Error", error.message, "error")
		}
		finally{
			setIsLoading(false)
		}
	}
	return {isLoading, handleCreatePost}
}