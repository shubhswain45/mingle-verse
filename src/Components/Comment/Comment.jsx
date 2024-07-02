import { useState } from "react";
import { Avatar, Button, Flex, Skeleton, SkeletonCircle, Text, Box } from "@chakra-ui/react";
import useGetUserProfileById from "../../CustomHooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
    const [isExpanded, setIsExpanded] = useState(false);
	

    if (isLoading) return <CommentSkeleton />;

    return (
        <Flex gap={4} alignItems="flex-start" maxW="full">
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size="sm" />
            </Link>
            <Flex direction="column" flex="1">
                <Flex gap={2} alignItems="baseline" flexWrap="wrap">
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight="bold" fontSize="12px" minWidth="fit-content">
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Box position="relative" maxW="full">
                        <Text
                            fontSize="14px"
                            flexShrink="1"
                            minWidth="0"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            maxHeight={isExpanded ? "none" : "120px"}
                            overflow="hidden"
                        >
                            {comment.comment}
                        </Text>
                        {!isExpanded && comment.comment.length > 300 && (
                            <Button
                                size="xs"
                                colorScheme="blue"
                                variant="link"
                                onClick={() => setIsExpanded(true)}
                                position="absolute"
                                bottom="0"
                                right="0"
                                bg="white"
                                _hover={{ textDecoration: "none" }}
                            >
                                See More
                            </Button>
                        )}
                    </Box>
                </Flex>
                <Text fontSize="12px" color="gray" mt={1}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w="full" alignItems="flex-start">
            <SkeletonCircle h={10} w="10" />
            <Flex gap={1} flexDirection="column" flex="1">
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};
