import { VStack, Heading, HStack, Box, Image } from '@chakra-ui/react';
import EditBasicInfo from './EditBasicInfo';
import EditSecurity from './EditSecuritu';
import leafImage from '../assets/leaf.png';
import cloudImage from '../assets/cloud.png';

const MyProfile = () => {
  return (
    <VStack pt="14vh" position="relative" top="20px">
      <Heading
        mb={['32px !important']}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
        bgClip="text"
        position="relative"
        zIndex="1"
        pb="9px"
      >
        My Profile
      </Heading>
      <Image
        src={leafImage}
        alt="brand"
        position="absolute"
        top="14vh"
        left="8vw"
        zIndex="0"
        height="30vh"
      />
      <Image
        src={cloudImage}
        alt="brand"
        position="absolute"
        bottom="-12vh"
        right="5vw"
        zIndex="0"
        height="30vh"
      />
      <HStack
        border="4px solid white"
        alignItems="center"
        justifyContent="center"
        bg="#87d4cd"
        borderRadius="20px"
        position="relative"
        zIndex="1"
        w="65vw"
        h="55vh"
      >
        <Box mr="50px">
          <EditBasicInfo />
        </Box>
        <Box>
          <EditSecurity />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MyProfile;
