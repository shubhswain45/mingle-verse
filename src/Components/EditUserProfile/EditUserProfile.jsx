import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Switch,
} from '@chakra-ui/react';
import useUserProfileStore from '../../store/userProfileStore';
import useSelectImageFromFile from '../../CustomHooks/useSelectImageFromFile';
import useEditProfile from '../../CustomHooks/useEditProfile';
import useRemoveProfile from '../../CustomHooks/useRemoveProfile';

const EditUserProfile = ({ isOpen, onClose }) => {
  const { userProfile } = useUserProfileStore();
  const fileRef = useRef()
  const { selectedFile, handleImageChange, setSelectedFile } = useSelectImageFromFile()
  const {editProfile, isUpdating} = useEditProfile()
  const {removeProfile, isLoading} = useRemoveProfile()
  const [inputs, setInputs] = useState({
    username: '',
    bio: '',
    gender: '',
    isPrivateAccount: false
  });

  
  useEffect(() => {
    if (userProfile) {
      setInputs({
        username: userProfile.username || '',
        bio: userProfile.bio || '',
        gender: userProfile.gender || '',
        isPrivateAccount: userProfile.isPrivateAccount || false
      });
    }
  }, [userProfile]);
  console.log(inputs);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setInputs((prev) => ({ ...prev, isPrivateAccount: e.target.checked }));
  };

  const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

  const handleRemoveProfilepic = async () => {
    try {
      await removeProfile();
      onClose()
      // Update local state to reflect removal
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={"#1A202C"}>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} overflowY="auto">
          <Stack spacing={4} align="center" mb={4} direction="row" justify="center" position="sticky" top="0" bg={"#1A202C"} zIndex="sticky">
            <Avatar size="2xl" src={selectedFile || userProfile.profilePicURL} />
            <Button size="sm" colorScheme="blue" onClick={() => fileRef.current.click()}>Change</Button>
            <input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
            <Button size="sm" variant="outline" colorScheme="red" isLoading={isLoading} onClick={handleRemoveProfilepic}>Remove</Button>
          </Stack>
          <Box maxH="36vh" overflowY="auto">
            <VStack align="stretch">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  size="sm"
                  placeholder="Enter your username"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  size="sm"
                  placeholder="Tell us about yourself"
                  name="bio"
                  value={inputs.bio}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Gender</FormLabel>
                <Stack direction="row">
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => setInputs((prev) => ({ ...prev, gender: 'Male' }))}
                    isActive={inputs.gender === 'Male'}
                  >
                    Male
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="pink"
                    onClick={() => setInputs((prev) => ({ ...prev, gender: 'Female' }))}
                    isActive={inputs.gender === 'Female'}
                  >
                    Female
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="gray"
                    onClick={() => setInputs((prev) => ({ ...prev, gender: 'Other' }))}
                    isActive={inputs.gender === 'Other'}
                  >
                    Other
                  </Button>
                </Stack>
              </FormControl>
              <FormControl display="flex" alignItems="center" mt={5}>
                <FormLabel htmlFor="privateSwitch" mb="0">
                  Private Account
                </FormLabel>
                <Switch
                  id="privateSwitch"
                  isChecked={inputs.isPrivateAccount}
                  onChange={handleSwitchChange}
                  size="md"
                  ml={2}
                />
              </FormControl>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" isLoading={isUpdating} onClick={handleEditProfile}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserProfile;
