import {
  Heading,
  HStack,
  VStack,
  Button,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Input,
  Text,
  Image,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { useAuthContext } from './AuthContextProvider';
import leafImage from '../assets/leaf.png';
import cloudImage from '../assets/cloud.png';

const CompanyInfo = () => {
  const toast = useToast();
  const [errorVisible, setErrorVisible] = useState(false);
  const filePicker = useRef(null);
  const [files, setFiles] = useState();
  const { company, handleEditCompany } = useAuthContext();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    if (!files) {
      setErrorVisible(true);
      return;
    }
    formData.append('files', files[0]);

    handleEditCompany(formData, window.localStorage.getItem('companyId'), data.companyName);
    toast({
      title: 'Company informations changed.',

      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack pt="14vh">
      <Heading
        mb={['32px !important']}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
        bgClip="text"
        position="relative"
        zIndex="1"
        pb="6px"
      >
        Company Info
      </Heading>
      <Image
        src={leafImage}
        alt="brand"
        position="absolute"
        top="100px"
        left="90px"
        zIndex="0"
        height="30vh"
      />
      <Image
        src={cloudImage}
        alt="brand"
        position="absolute"
        bottom="-100px"
        right="60px"
        zIndex="0"
        height="30vh"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          border="4px solid white"
          pt="0px"
          pb="20px"
          bg="#87d4cd"
          borderRadius="20px"
          w="70vw"
          position="relative"
        >
          <Box bg="gray.200" borderRadius="13px" w="100%" p="10px" mb="10px" textAlign="center">
            <Text color="#3e9e98" fontWeight="bold" fontSize="20px">
              Edit company informations
            </Text>
          </Box>

          <HStack>
            <VStack>
              <Text alignSelf="flex-start" color="white" fontSize="15px">
                Company Name
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    color="gray.300"
                    pointerEvents="none"
                    children={<FiBriefcase />}
                  />
                  <Input
                    bg="white"
                    borderColor="white"
                    type="text"
                    placeholder={company}
                    {...register('companyName', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              <Text alignSelf="flex-start" color="white" fontSize="15px">
                Company Logo
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
                <FormLabel
                  htmlFor="file-upload"
                  fontSize="14"
                  color="#CBD5E0"
                  fontWeight="semibold"
                >
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
                  Choose file
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
                style={{ marginTop: '35px' }}
                _hover={{
                  background: '#e0e0e0',
                }}
                color="gray"
                textShadow="1px 1px #e0e0e0"
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="white"
                borderRadius="10px"
                // style="margin-top: 35px;"
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
    </VStack>
  );
};

export default CompanyInfo;
