import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
    useColorModeValue,
} from "@chakra-ui/react";
import Comment from "./Comment";
import usePostComment from "../../CustomHooks/usePostComment";
import { useEffect, useRef } from "react";
import useShowToast from "../../CustomHooks/useShowToast";

const CommentsModal = ({ isOpen, onClose, post }) => {
    const {handlePostComment, isCommenting} = usePostComment()
    const commentRef = useRef(null)
    const commentContainerRef = useRef(null)
    const showToast = useShowToast()
    const handleSubmitComment = async(e) => {
        e.preventDefault()
        if(commentRef.current.value.length > 700) {
            showToast("Error", "The Comment is Too Large", "error")
            return;
          }
        await handlePostComment(post.id, commentRef.current.value)
        commentRef.current.value = ""
    }

    useEffect(() => {
        const scrollToBottom = () => {
            commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight
        }
        if(isOpen){
            setTimeout(() => {
                scrollToBottom()

            },100)
        }
    }, [isOpen, post.comments.length])
	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={useColorModeValue('white', 'gray.700')} border={"1px solid white"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentContainerRef}>
                        {post.comments.map((comment, idx) => (
                            <Comment key={idx} comment={comment}/>
                        ))}
                    </Flex>
					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }} border={"1px solid white"}>
						<Input placeholder='Comment' size={"sm"} color={"white"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} colorScheme="blue" isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;