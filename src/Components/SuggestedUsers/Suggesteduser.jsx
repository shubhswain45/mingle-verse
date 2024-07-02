import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import useFollowUser from '../../CustomHooks/useFollowOrUnfollowUser';
import useAuthStore from '../../store/authStore';
import useShowToast from '../../CustomHooks/useShowToast';
import { Link } from 'react-router-dom';

function Suggesteduser({ name, followers, avatar, uid, setUser, notShowFollowBtn = false }) {
  // const [isFollowed, setIsFollowed] = useState(false);
  const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(uid)
  const {user} = useAuthStore()

  const onFollowUser = async() => {                                                                         
    await handleFollowUser()  //DB    //Follow                                                            -
    setUser(prev => isFollowing ? {...prev, followers:prev.followers.filter((uid) => uid !== user.uid)} : {...prev, followers: [...prev.followers, user.uid]}) 
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full">
      <Flex alignItems="center" gap={2}>
        <Link to={`/${name}`}><Avatar src={avatar} size="md" /></Link>
        <VStack spacing={2} alignItems={"flex-start"}>
         <Link to={`/${name}`}><Box 
            fontSize={12} 
            fontWeight="bold" 
            width={120} 
            whiteSpace="nowrap" 
            overflow="hidden" 
            textOverflow="ellipsis"
          >
            {name}
          </Box></Link>
          <Box fontSize={12} color="gray.500">
            {followers} followers
          </Box>
        </VStack>
      </Flex>
      {
        user.uid !== uid && !notShowFollowBtn &&  <Button
        fontSize={13}
        bg="transparent"
        p={0}
        h="max-content"
        fontWeight="medium"
        color="blue.400"
        cursor="pointer"
        _hover={{ color: "white" }}
        isLoading={isUpdating}
        onClick={onFollowUser}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button> 
      }
    </Flex>
  );
}

export default Suggesteduser;
