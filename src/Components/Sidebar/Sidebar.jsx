import {
  CreateIcon,
  HomeIcon,
  NotificationIcon,
  ProfileIcon,
  SearchIcon
} from "../../assets/constant";
import { Box, Flex, Link, Image, Tooltip, Avatar, Button } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";
import { allImages } from "../../assets/assets";
import useLogout from "../../CustomHooks/useLogout";
import useAuthStore from "../../store/authStore";
import SidebarItems from "./SidebarItems";

function Sidebar() {
  const {handleLogout, loading, error} = useLogout()
  const {user} = useAuthStore()

  const iconSize = "5em"; // Adjust icon size as needed

  const sidebarItems = [
    {
      icon: <HomeIcon size={20} />,
      text: "Home",
      link: "/"
    },
    {
      icon: <SearchIcon size={20}  />,
      text: "Search",
      link: "/"
    },
    {
      icon: <NotificationIcon size={20}  />,
      text: "Notification",
      link: "/"
    },
    {
      icon: <CreateIcon size={20} />,
      text: "Create",
      link: "/"
    },
    {
      icon: <Avatar src={user.profilePicURL} boxSize={9}/>,
      text: "Profile",
      link: `/${user.username}`
    },
  ];

  return (
    <Box
      height="100vh"
      borderRight="1px solid"
      borderColor="whiteAlpha.300"
      py={8}
      position="sticky"
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction="column" gap={10} w="full" height="full">
        <Link
          to="/"
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor="pointer"
        >
          <Image
            src={allImages.logo}
            w={150}
          />
        </Link>

        <Link
          to="/"
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={10}
          cursor="pointer"
          alignItems="center"  // Align center for small dimension
          justifyContent="center"  // Align center for small dimension
          mx={"auto"}
        >
           <Image
            src="https://cdn-icons-png.freepik.com/512/9089/9089798.png"
            w={500}
          />
        </Link>

        <Flex direction="column" gap={5} cursor="pointer">
          <SidebarItems/>
        </Flex>
        <Tooltip
              hasArrow
              label={"Logout"}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              
              <Flex
                onClick={handleLogout}
                display="flex"
                mt={"auto"}
                as={RouterLink}
                alignItems="center"
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{base:"center", md:"flex-start"}}    
                mx={"auto"}
              >
            <BiLogOut size={20}></BiLogOut>
                <Button display={{base:"none", md:"block"}}
                 variant={"ghost"}
                 _hover={{bg:"transparent"}}
                 isLoading={loading}
                 ml={-3}
                >Logout</Button>
              </Flex>
             
            </Tooltip>
      </Flex>
    </Box>
  );
}

export default Sidebar;
