import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Spacer,
  Box,
  FormControl,
  InputGroup,
  InputElement,
  InputLeftElement,
  InputRightElement,
  Input,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';

const LoginRegister = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const filePicker = useRef(null);
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  return (
    <VStack w="100%" mx="left">
      {props.activeOption === 'login' ? (
        //   Login
        <Box mt="10%" textAlign="center">
          <Heading color="#FFE300" mb="8">
            Welcome
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.setIsLoggedIn(true);
            }}
          >
            <VStack>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<i className="fas fa-user-alt"></i>}
                  />
                  <Input type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<i className="fas fa-lock"></i>}
                  />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPasswordChange}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText
                  textAlign="left"
                  mt="3"
                  mb="3"
                  onClick={() => props.setActiveOption('register')}
                >
                  Don't have an account?
                </FormHelperText>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" bg="#FFEF78" width="full">
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      ) : (
        //   Register
        <Box mt="10%" textAlign="center">
          <Heading color="#FFE300" mb="8">
            Register
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.setIsLoggedIn(true);
            }}
          >
            <VStack>
              {/* Name */}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<i className="fas fa-signature"></i>}
                />
                <Input type="text" placeholder="Name" />
              </InputGroup>
              {/* Email */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<i className="fas fa-user-alt"></i>}
                  />
                  <Input type="email" placeholder="Email address" />
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
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPasswordChange}>
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
                  borderColor="#E2E8F0"
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
                  onClick={() => props.setActiveOption('login')}
                >
                  Already have an account?
                </FormHelperText>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" bg="#FFEF78" width="full">
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
