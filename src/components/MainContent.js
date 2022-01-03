import { Heading, HStack, VStack, Text, Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import SideBar from './SideBar';
import { useAuthContext } from './AuthContextProvider';
import womanImage from '../assets/woman-image.jpg';
import { Link } from 'react-router-dom';

console.log(womanImage);
const MainContent = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <HStack>
      {isLoggedIn ? (
        <HStack>
          <SideBar w="10vw" />
          <Heading w="80vw">Main content</Heading>
        </HStack>
      ) : (
        <Box
          h="80vh"
          d="flex"
          w="100vw"
          justifyContent="space-around"
          padding="20px"
          alignItems="center"
        >
          <VStack boxShadow="2xl" p="5%" borderRadius="10px" color="#38C6BD">
            <Text fontSize="30px" fontWeight="bold" mb={5} textShadow="1px 1px #e0e0e0">
              Welcome
            </Text>
            <Box textAlign="center" mb={5}>
              <Text> You already have an account? </Text>
              <Link to="/login">
                <Text
                  fontWeight="bold"
                  fontSize="20px"
                  textShadow="1px 1px #e0e0e0"
                  cursor="pointer"
                >
                  LOGIN
                </Text>
              </Link>
            </Box>

            <Box textAlign="center">
              <Text>You don't have an account?</Text>
              <Link to="/register">
                <Text
                  fontWeight="bold"
                  fontSize="20px"
                  textShadow="1px 1px #e0e0e0"
                  cursor="pointer"
                >
                  REGISTER
                </Text>
              </Link>
            </Box>
          </VStack>

          <Box>
            <Image src={womanImage} alt="Woman image" w="600px" h="auto"></Image>
          </Box>
        </Box>
      )}
    </HStack>
  );
};

export default MainContent;
