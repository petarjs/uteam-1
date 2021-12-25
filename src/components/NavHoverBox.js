import { Flex, Heading, Text, Icon } from '@chakra-ui/react';
const NavHoverBox = ({ icon, title, description }) => {
  return (
    <>
      <Flex
        h={200}
        w={200}
        w="100%"
        flexDir="column"
        alignItems="center"
        justify="center"
        backgroundColor="#97FFCF"
        borderRadius="10px"
        color="#fff"
        textAlign="center"
        textShadow="1px 1px #e0e0e0"
      >
        <Icon as={icon} fontSize="3xl" mb={4} />
        <Heading size="md" fontWeight="normal">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export default NavHoverBox;
