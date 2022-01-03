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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuthContext } from './AuthContextProvider';
import { Redirect } from 'react-router-dom';

const LoginRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const { handleLogin, isLoggedIn, setActiveOption, errorVisible } = useAuthContext();

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <VStack w="100%" h="100vh" mx="left" bgGradient="linear(to-r, #E8F6EF, #E8F6EF)">
          <Box bg="white" mt="10%" textAlign="center" boxShadow="md" p={6} rounded="md">
            <Heading color="#2FE1D6" mb="8" textShadow="1px 1px #e0e0e0">
              Welcome
            </Heading>
            <form
              onSubmit={(e) => {
                handleLogin(e, emailValue, passwordValue);
              }}
            >
              <VStack>
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
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
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
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
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
                  {errorVisible && (
                    <FormHelperText color="red" textAlign="left" mt="3" mb="3">
                      Invalid email or password
                    </FormHelperText>
                  )}
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
        </VStack>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default LoginRegister;
