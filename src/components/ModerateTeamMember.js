import { Button, Heading, HStack, VStack, Flex } from '@chakra-ui/react';
import EditBasicInfo from './EditBasicInfo';
import EditAnswers from './EditAnswers';
import { changeProfileStatus } from '../services/profile';
import { useAuthContext } from './AuthContextProvider';
import { getProfilesFromCompnay } from '../services/profile';
import { useToast } from '@chakra-ui/react';

const ModerateTeamMember = () => {
  const toast = useToast();
  const { setAllCompaniesProfilesResponse } = useAuthContext();

  const handleProfileStatusChange = async () => {
    changeProfileStatus(window.localStorage.getItem('currentProfileId'));
    const allCompaniesProfiles = await getProfilesFromCompnay(
      window.localStorage.getItem('companyId')
    );
    window.localStorage.setItem(
      'allCompaniesProfiles',
      JSON.stringify(allCompaniesProfiles.data.data)
    );
    setAllCompaniesProfilesResponse(
      JSON.parse(window.localStorage.getItem('allCompaniesProfiles'))
    );
    toast({
      title: 'Profile status approved!',

      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <VStack pt="14vh">
      <HStack w="80%" justifyContent="space-between">
        <Heading
          mb={['32px !important']}
          fontWeight="bold"
          bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
          bgClip="text"
          position="relative"
          zIndex="1"
          pb="10px"
        >
          Moderate team member entry
        </Heading>
        <Flex>
          <Button
            mb={['32px !important']}
            bg="#87d4cd"
            color="white"
            onClick={handleProfileStatusChange}
          >
            Approve
          </Button>
          <Button
            mb={['32px !important']}
            ml="20px"
            bg="#87d4cd"
            color="white"
            pl="25px"
            pr="25px"
            disabled={
              window.localStorage.getItem('profileId') ==
              window.localStorage.getItem('currentProfileId')
                ? true
                : false
            }
          >
            Delete
          </Button>
        </Flex>
      </HStack>
      <HStack w="80%" justifyContent="space-around" alignItems="flex-start">
        <Flex bg="#87d4cd" border="40px solid #87d4cd" borderRadius="20px">
          <EditBasicInfo />
        </Flex>
        <EditAnswers />
      </HStack>
    </VStack>
  );
};

export default ModerateTeamMember;
