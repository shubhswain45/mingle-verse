import { Avatar, Flex, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { allImages } from '../../assets/assets'
import {Link,Link as RouterLink } from 'react-router-dom'
import useLogout from '../../CustomHooks/useLogout'
import useAuthStore from '../../store/authStore'

function SuggestedHeader() {
  const {handleLogout, loading, error} = useLogout()
  const {user} = useAuthStore()

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2} >
        <Link to={`${user.username}`}><Avatar size={"lg"} src={user.profilePicURL}/></Link>
        <Link to={`${user.username}`}><Box fontSize={12} fontWeight={"bold"}>
            {user.username}
        </Box></Link>
      </Flex>
      <Button
       fontSize={14}
       color={"blue.400"}
       style={{textDecoration:"none"}}
       cursor={"pointer"}
       onClick={handleLogout}
      >
      Log out
      </Button>
    </Flex>
  )
}

export default SuggestedHeader
