import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Tooltip,
    useDisclosure,
    useColorModeValue,
    Text,
    VStack,
    Input,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import { MessageIcon } from "../../assets/constant";
import Suggesteduser from "../SuggestedUsers/Suggesteduser";
import useSendMessage from "../../CustomHooks/useSendMessage";

const Message = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isSending, sendMessage} = useSendMessage()

    const handleSendMessage = async() => {
        await sendMessage()
    }
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
                    <MessageIcon size={25} />
                    <Box display={{ base: "none", md: "block" }}>Message</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'>
                <ModalOverlay />
                <ModalContent
                    bg={useColorModeValue('white', '#1A202C')}
                    border={"1px solid gray"}
                    h={"80vh"}
                    w={"80vw"}
                    maxW={"80vw"}
                    maxH={"80vh"}
                    mx={"auto"}
                    my={"auto"}
                    borderRadius={8}
                >
                    <ModalCloseButton
                        color="white"
                        position={"absolute"}
                        zIndex="3" // Sets the z-index to 3 (wrap in quotes because of the hyphen)
                    />
                    <ModalBody p={0}>
                        <Flex direction={{ base: "column", md: "row" }} h="100%">
                            <Box
                                flex={{ base: "0 0 100%", md: "0 0 30%" }}
                                borderRight={{ base: "none", md: "1px solid gray" }}
                                borderBottom={{ base: "1px solid gray", md: "none" }}
                                p={4}
                                ml={4}
                                maxH={"80vh"}
                                overflowY="auto" // Enable vertical scrolling
                                css={{ // Necessary for scrolling to work on iOS Safari
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                <Box
                                    height={100}
                                    width={325}
                                    bg={useColorModeValue('white', '#1A202C')}
                                    top={0}
                                    zIndex={1}
                                    position={"absolute"}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderBottom={"1px solid gray"}
                                >
                                    <Text fontSize={25} mt={3} textAlign={{ base: "center", md: "left" }} ml={-200}>
                                        UserName
                                    </Text>
                                </Box>

                                <VStack spacing={6} align="stretch" mt={30}>
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />
                                </VStack>
                            </Box>
                            <Box flex={{ base: "1", md: "1" }} p={4}>
                                {/* Right part content */}
                                <Box
                                    height={'13.8vh'}
                                    width={'52vw'}
                                    bg={useColorModeValue('white', '#1A202C')}
                                    top={0}
                                    zIndex={1}
                                    position={"absolute"}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderBottom={"1px solid gray"}
                                >
                                    <Suggesteduser avatar={''} followers={"50"} name={"sethRollins"} uid={"7"} notShowFollowBtn={true} />

                                </Box>

                                <Input
                                    onSubmit={handleSendMessage}
                                    mt={500}
                                    type="text"
                                    borderRadius={20}
                                    _hover={{ borderColor:"gray"}}
                                    borderColor={"gray"}
                                    placeholder="Your Message..."
                                    color="white" // Set input text color to white
                                    _placeholder={{ color: 'white' }} // Set placeholder text color to white
                                // You can add more props as needed, such as onChange, value, etc.
                                />
                                 <Button _hover={{bg:"transparent", color:"white"}} color ={"#22c1e0"} bg={"transparent"} onClick={handleSendMessage}  ml={735} isLoading={isSending} cursor={"pointer"}>Send</Button>
                                    
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Message;
