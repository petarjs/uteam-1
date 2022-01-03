import { HStack, Text, Button, Spacer, Icon } from '@chakra-ui/react';
import { WiStars } from 'react-icons/wi';
import { useAuthContext } from './AuthContextProvider';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const { isLoggedIn, handleLogout } = useAuthContext();

  return (
    <HStack
      alignItems="stretch"
      bgGradient="linear(to-r, #38C6BD, #38C6BD, #97FFCF)"
      h="10vh"
      borderBottom="3px solid"
      borderColor="white"
    >
      <HStack color="White" fontWeight={'extrabold'} pl={10}>
        <Icon color="white" as={WiStars} fontSize="xxx-large" />
        <Link to="/">
          <Text pl={1} _hover={{ cursor: 'pointer' }}>
            uTeam
          </Text>
        </Link>
      </HStack>
      <Spacer />
      {isLoggedIn ? (
        <HStack pr={10}>
          <Link to="/">
            <Button
              _focus="outline-none"
              bg="white"
              color="#38C6BD"
              variant="solid"
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </Button>
          </Link>

          <Button _focus="outline-none" bg="white" color="#38C6BD" variant="solid">
            My Profile
          </Button>
        </HStack>
      ) : (
        <HStack pr={10}>
          <Link to="/login">
            <Button _focus="outline-none" bg="white" color="#38C6BD" variant="solid">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button _focus="outline-none" bg="white" color="#38C6BD" variant="solid">
              Register
            </Button>
          </Link>
        </HStack>
      )}
    </HStack>
  );
};

export default TopBar;
