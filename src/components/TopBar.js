import { HStack, Text, Button, Spacer, Box } from '@chakra-ui/react';

const TopBar = (props) => {
  return (
    <HStack
      alignItems="stretch"
      bgGradient="linear(to-r, prettyPink, prettyPink, prettyOrange)"
      h="10vh"
      borderBottom="3px solid"
      borderColor="white"
    >
      <HStack color="White" fontWeight={'extrabold'} pl={10}>
        <i className="far fa-building"></i>
        <Text pl={1}>uTeam</Text>
      </HStack>
      <Spacer />
      {props.isLoggedIn ? (
        <HStack pr={10}>
          <Button
            bg="white"
            color="prettyPink"
            variant="solid"
            onClick={() => {
              props.setIsLoggedIn(false);
              props.setActiveOption('login');
            }}
          >
            Logout
          </Button>
          <Button bg="white" color="prettyPink" variant="solid">
            My Profile
          </Button>
        </HStack>
      ) : (
        <HStack pr={10}>
          <Button
            bg="white"
            color="prettyPink"
            variant="solid"
            onClick={() => props.setActiveOption('login')}
          >
            Login
          </Button>
          <Button
            bg="white"
            color="prettyPink"
            variant="solid"
            onClick={() => props.setActiveOption('register')}
          >
            Register
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default TopBar;
