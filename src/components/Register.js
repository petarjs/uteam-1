import {
  VStack,
  Heading,
  Button,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useAuthContext } from './AuthContextProvider';
import { Redirect, Link } from 'react-router-dom';

const Register = () => {
  const filePicker = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [duplicateCredentials, setDuplicateCredentials] = useState(false);
  const { handleUserRegister, isLoggedIn } = useAuthContext();
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (!files) {
      setErrorVisible(true);
      return;
    }
    formData.append('files', files[0]);
    const registrationSuccessfull = await handleUserRegister(
      formData,
      data.company,
      data.name,
      data.email,
      data.password
    );
    if (!registrationSuccessfull) {
      setDuplicateCredentials(true);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <VStack w="100%" h="100vh" mx="left" bgGradient="linear(to-r, #E8F6EF, #E8F6EF)">
      <Box
        margin="auto"
        bg="white"
        p={6}
        mt="8%"
        textAlign="center"
        boxShadow="md"
        p={6}
        rounded="md"
      >
        <Heading color="#2FE1D6" mb="8" textShadow="1px 1px #e0e0e0">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            {/* Name */}
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                pointerEvents="none"
                children={<i className="fas fa-signature"></i>}
              />
              <Input
                borderColor="#2FE1D6"
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
              />
            </InputGroup>
            {/* Email */}
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  color="gray.300"
                  pointerEvents="none"
                  children={<i className="fas fa-user-alt"></i>}
                />
                <Input
                  borderColor="#2FE1D6"
                  type="email"
                  placeholder="Email address"
                  {...register('email', { required: true })}
                />
              </InputGroup>
            </FormControl>
            {/*Company*/}
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                pointerEvents="none"
                children={<i className="fas fa-suitcase"></i>}
              />
              <Input
                borderColor="#2FE1D6"
                type="text"
                placeholder="Company"
                {...register('company', { required: true })}
              />
            </InputGroup>
            {/* Password */}
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<i className="fas fa-lock"></i>}
                />
                <Input
                  borderColor="#2FE1D6"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    _focus="outline-none"
                    _hover={{
                      background: '#2FE1D6',
                    }}
                    color="white"
                    textShadow="1px 1px #e0e0e0"
                    bg="#2FE1D6"
                    h="1.75rem"
                    size="sm"
                    onClick={(e) => handleShowPasswordChange(e)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {/* Upload */}
              <InputGroup
                justifyContent="space-between"
                alignItems="center"
                mt="2"
                border="1px solid"
                borderColor="#2FE1D6"
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
                    background: '#2FE1D6',
                  }}
                  color="white"
                  textShadow="1px 1px #e0e0e0"
                  bg="#2FE1D6"
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
              <Link to="/login">
                <FormHelperText textAlign="left" mt="10" mb="3" cursor="pointer">
                  Already have an account?
                </FormHelperText>
              </Link>
            </FormControl>
            <Button
              _focus="outline-none"
              _hover={{
                background: '#2FE1D6',
              }}
              color="white"
              textShadow="1px 1px #e0e0e0"
              bg="#2FE1D6"
              borderRadius={0}
              type="submit"
              variant="solid"
              bg="#2FE1D6"
              width="full"
            >
              Register
            </Button>
          </VStack>
          {(errors.name || errors.email || errors.password || errorVisible) && (
            <Text color="red" fontSize="15px" mt={3}>
              This field is required
            </Text>
          )}
          {duplicateCredentials && (
            <Text color="red" fontSize="15px" mt={3}>
              Email/Username already used
            </Text>
          )}
        </form>
      </Box>
    </VStack>
  );
};

export default Register;
