import {
  HStack,
  VStack,
  Button,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from './AuthContextProvider';
const EditSecurity = () => {
  const toast = useToast();
  const { handlePasswordChange } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handlePasswordChange(data.currentPassword, data.newPassword);
    toast({
      title: 'Password changed.',

      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack p="20px" bg="#3e9e98" border="2px solid gray" borderRadius="20px">
        <Box bg="gray.200" borderRadius="10px" w="100%" p="10px" mb="10px">
          <Text alignSelf="flex-start" color="#3e9e98" fontWeight="bold" fontSize="20px">
            Security
          </Text>
        </Box>

        <HStack>
          <VStack>
            <Text alignSelf="flex-start" color="white" fontSize="15px">
              Current password
            </Text>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  color="gray.300"
                  pointerEvents="none"
                  children={<i className="fas fa-lock"></i>}
                />
                <Input
                  bg="white"
                  borderColor="white"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Current password"
                  {...register('currentPassword', { required: true })}
                />
              </InputGroup>
            </FormControl>

            <Text alignSelf="flex-start" color="white" fontSize="15px">
              New password
            </Text>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<i className="fas fa-lock"></i>}
                />
                <Input
                  borderColor="white"
                  bg="white"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  {...register('newPassword', { required: true })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    _focus="outline-none"
                    _hover={{
                      background: '#2FE1D6',
                    }}
                    color="white"
                    textShadow="1px 1px #e0e0e0"
                    bg="gray.400"
                    h="1.75rem"
                    size="sm"
                    onClick={(e) => handleShowPasswordChange(e)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {(errors.newPassword || errors.currentPassword) && (
              <Text color="red" fontSize="15px" mt={3}>
                Password field is required
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
      </VStack>
    </form>
  );
};

export default EditSecurity;
