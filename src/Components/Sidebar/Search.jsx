import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "../../assets/constant";
import useSearchUser from "../../CustomHooks/useSearchUser";
import { useRef } from "react";
import Suggesteduser from "../SuggestedUsers/Suggesteduser";

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, isLoading, getUserProfile, setUser } = useSearchUser();
    const searchRef = useRef();

    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Search"}
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
                    <SearchIcon size={25} />
                    <Box display={{ base: "none", md: "block" }}>Search</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
                <ModalOverlay />
                <ModalContent bg={useColorModeValue('white', 'gray.700')} border={"1px solid gray"} maxW={"500px"}>
                    <ModalHeader textAlign="center" color="white">Search User</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel color="white">Username</FormLabel>
                                <Input
                                    placeholder='Enter username'
                                    ref={searchRef}
                                    bg="gray.700"
                                    color="white"
                                    _placeholder={{ color: 'gray.500' }}
                                    focusBorderColor="blue.500"
                                />
                            </FormControl>

                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button
                                    isLoading={isLoading}
                                    type='submit'
                                    ml={"auto"}
                                    size={"md"}
                                    my={4}
                                    colorScheme="blue"
                                >
                                    Search
                                </Button>
                            </Flex>
                        </form>

                        {isLoading ? (
                            <Flex justifyContent="center" mt={4}>
                                <Spinner size="lg" />
                            </Flex>
                        ) : (
                            user && (
                                <Box mt={4} bg="gray.700" p={4} borderRadius="md">
                                    <Suggesteduser
                                        avatar={user.profilePicURL}
                                        name={user.username}
                                        followers={user.followers.length}
                                        uid={user.uid}
                                        setUser={setUser}
                                    />
                                </Box>
                            )
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Search;
