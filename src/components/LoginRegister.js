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
} from '@chakra-ui/react';
import { useState, useRef } from 'react';

const LoginRegister = ({ setIsLoggedIn, activeOption, setActiveOption }) => {
  const [showPassword, setShowPassword] = useState(false);
  const filePicker = useRef(null);
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  return (
    <VStack w="100%" h="100vh" mx="left" bgGradient="linear(to-r, #E8F6EF, #E8F6EF)">
      {activeOption === 'login' ? (
        <Box bg="white" mt="10%" textAlign="center" boxShadow="md" p={6} rounded="md">
          <Heading color="#2FE1D6" mb="8" textShadow="1px 1px #e0e0e0">
            Welcome
          </Heading>
          <form onSubmit={(e) => handleLogin(e)}>
            <VStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    color="gray.300"
                    pointerEvents="none"
                    children={<i className="fas fa-user-alt"></i>}
                  />
                  <Input borderColor="#2FE1D6" type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
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
                <FormHelperText
                  color="gray.300"
                  textAlign="left"
                  mt="3"
                  mb="3"
                  onClick={() => setActiveOption('register')}
                >
                  Don't have an account?
                </FormHelperText>
              </FormControl>
              <Button
                _hover={{
                  background: '#2FE1D6',
                }}
                color="white"
                textShadow="1px 1px #e0e0e0"
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="#2FE1D6"
                width="full"
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      ) : (
        //   Register
        <Box bg="white" p={6} mt="8%" textAlign="center" boxShadow="md" p={6} rounded="md">
          <Heading color="#2FE1D6" mb="8" textShadow="1px 1px #e0e0e0">
            Register
          </Heading>
          <form onSubmit={(e) => handleLogin(e)}>
            <VStack>
              {/* Name */}
              <InputGroup>
                <InputLeftElement
                  color="gray.300"
                  pointerEvents="none"
                  children={<i className="fas fa-signature"></i>}
                />
                <Input borderColor="#2FE1D6" type="text" placeholder="Name" />
              </InputGroup>
              {/* Email */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    color="gray.300"
                    pointerEvents="none"
                    children={<i className="fas fa-user-alt"></i>}
                  />
                  <Input borderColor="#2FE1D6" type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
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
                    Upload File
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
                  <Input id="email" type="file" ref={filePicker} d="none" />
                </InputGroup>
                <FormHelperText
                  textAlign="left"
                  mt="10"
                  mb="3"
                  onClick={() => setActiveOption('login')}
                >
                  Already have an account?
                </FormHelperText>
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
          </form>
        </Box>
      )}
    </VStack>
  );
};

export default LoginRegister;
