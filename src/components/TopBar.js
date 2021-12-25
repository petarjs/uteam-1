import { HStack, Text, Button, Spacer, Icon } from '@chakra-ui/react';
import { WiStars } from 'react-icons/wi';

const TopBar = ({ isLoggedIn, setIsLoggedIn, setActiveOption }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveOption('login');
  };
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
        <Text pl={1} _hover={{ cursor: 'pointer' }}>
          uTeam
        </Text>
      </HStack>
      <Spacer />
      {isLoggedIn ? (
        <HStack pr={10}>
          <Button
            _focus="outline-none"
            bg="white"
            color="#38C6BD"
            variant="solid"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </Button>
          <Button _focus="outline-none" bg="white" color="#38C6BD" variant="solid">
            My Profile
          </Button>
        </HStack>
      ) : (
        <HStack pr={10}>
          <Button
            _focus="outline-none"
            bg="white"
            color="#38C6BD"
            variant="solid"
            onClick={() => setActiveOption('login')}
          >
            Login
          </Button>
          <Button
            _focus="outline-none"
            bg="white"
            color="#38C6BD"
            variant="solid"
            onClick={() => setActiveOption('register')}
          >
            Register
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default TopBar;
