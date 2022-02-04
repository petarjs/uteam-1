import { VStack, Heading, HStack, Box } from '@chakra-ui/react';
import EditBasicInfo from './EditBasicInfo';
import EditSecurity from './EditSecuritu';

const MyProfile = () => {
  return (
    <VStack pt="10vh">
      <Heading
        mb={['82px !important']}
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r, #38C6BD, pink.300, #38C6BD)"
        bgClip="text"
      >
        My Profile
      </Heading>
      <HStack>
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
