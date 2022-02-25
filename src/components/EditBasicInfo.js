import {
  HStack,
  VStack,
  Button,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useAuthContext } from './AuthContextProvider';
const EditBasicInfo = () => {
  const toast = useToast();
  const [errorVisible, setErrorVisible] = useState(false);
  const filePicker = useRef(null);
  const [files, setFiles] = useState();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { handleEditProfile } = useAuthContext();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (!files) {
      setErrorVisible(true);
      return;
    }
    formData.append('files', files[0]);
    await handleEditProfile(
      formData,
      data.name,
      window.localStorage.getItem('currentProfileId')
        ? window.localStorage.getItem('currentProfileId')
        : window.localStorage.getItem('profileId')
    );
    toast({
      title: 'Name and profile photo changed.',

      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        pt="0px"
        pb="20px"
        bg="#87d4cd"
        borderRadius="15px"
        w="25vw"
        position="relative"
        border="4px solid white"
      >
        <Box bg="gray.200" borderRadius="10px" w="100%" p="10px" mb="10px">
          <Text alignSelf="flex-start" color="#3e9e98" fontWeight="bold" fontSize="20px">
            Basic info
          </Text>
        </Box>

        <HStack>
          <VStack>
            <Text alignSelf="flex-start" color="white" fontSize="15px">
              Name
            </Text>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  color="gray.300"
                  pointerEvents="none"
                  children={<i className="fas fa-user-alt"></i>}
                />
                <Input
                  bg="white"
                  borderColor="white"
                  type="text"
                  placeholder={
                    window.localStorage.getItem('currentUserName')
                      ? window.localStorage.getItem('currentUserName')
                      : window.localStorage.getItem('userName')
                  }
                  {...register('name', { required: false })}
                />
              </InputGroup>
            </FormControl>

            <Text alignSelf="flex-start" color="white" fontSize="15px">
              Profile photo
            </Text>
            <InputGroup
              justifyContent="space-between"
              alignItems="center"
              mt="2"
              border="1px solid"
              borderColor="white"
              bg="white"
              borderRadius="5"
              p={1.5}
            >
              <FormLabel htmlFor="file-upload" fontSize="14" color="#CBD5E0" fontWeight="semibold">
                {files ? files[0].name : 'Upload File'}
              </FormLabel>
              <Button
                _focus="outline-none"
                _hover={{
                  background: 'white',
                }}
                color="gray"
                textShadow="1px 1px #e0e0e0"
                bg="gray.200"
                h="1.75rem"
                size="sm"
                onClick={() => {
                  filePicker.current.click();
                }}
              >
                Choose Photo
              </Button>
              <Input
                id="photo"
                type="file"
                ref={filePicker}
                d="none"
                onChange={(e) => setFiles(e.target.files)}
              />
            </InputGroup>
            {errorVisible && (
              <Text color="red" fontSize="15px" mt={3}>
                This field is required
              </Text>
            )}
            <Button
              _hover={{
                background: 'white',
              }}
              color="gray"
              textShadow="1px 1px #e0e0e0"
              borderRadius={0}
              type="submit"
              variant="solid"
              bg="white"
              borderRadius="10px"
            >
              Save
            </Button>
          </VStack>
        </HStack>
        {errors.name && (
          <Text color="red" fontSize="15px" mt={3}>
            Name field is required
          </Text>
        )}
      </VStack>
    </form>
  );
};
export default EditBasicInfo;
