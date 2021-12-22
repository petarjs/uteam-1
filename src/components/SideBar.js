import { VStack, HStack, Heading, Text, Button, Spacer, Box } from '@chakra-ui/react';

const SideBar = (props) => {
  return (
    <Box mx="left">
      {props.isLoggedIn ? (
        <VStack
          alignItems={'flex-start'}
          p={10}
          h="90vh"
          color="white"
          bgGradient="linear(to-t, prettyOrange, prettyPink)"
        >
          <Heading mt="20vh">Menu</Heading>
          <HStack>
            <i className="far fa-star"></i>
            <Text pl={1}>Pending for Approval</Text>
          </HStack>
          <HStack>
            <i className="far fa-star"></i>
            <Text pl={1}>Team</Text>
          </HStack>
          <HStack>
            <i className="far fa-star"></i>
            <Text pl={1}>Questions</Text>
          </HStack>
          <HStack>
            <i className="far fa-star"></i>
            <Text pl={1}>Company Info</Text>
          </HStack>
          <HStack>
            <i className="far fa-star"></i>
            <Text pl={1}>My Profile</Text>
          </HStack>
        </VStack>
      ) : null}
    </Box>
  );
};

export default SideBar;
