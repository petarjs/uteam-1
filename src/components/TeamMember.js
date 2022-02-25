const { VStack, HStack, Image, Button, Text, Flex } = require('@chakra-ui/react');

import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { deleteProfile } from '../services/profile';
import { useAuthContext } from './AuthContextProvider';

const TeamMember = ({ name, joined, profilePhoto, profileId }) => {
  const { allCompaniesProfilesResponse, setAllCompaniesProfilesResponse } = useAuthContext();
  const deleteTeamMember = async () => {
    await deleteProfile(profileId);
    const newMembers = allCompaniesProfilesResponse.filter((profile) => {
      return profile.id !== profileId;
    });
    window.localStorage.setItem('allCompaniesProfiles', JSON.stringify(newMembers));
    setAllCompaniesProfilesResponse(newMembers);

    return;
  };
  const handleDetailsButton = () => {
    window.localStorage.setItem('currentProfileId', profileId);
    window.localStorage.setItem('currentUserName', name);
  };

  let joinDate = dateFormat(new Date(joined).toString(), 'mmm dS, yyyy');
  let profilePhotoUrl = `http://localhost:1337${profilePhoto}`;
  console.log(profilePhotoUrl);
  return (
    <VStack p="10px" border="5px solid #87d4cd" borderRadius="20px" w="30%">
      <Flex justifyContent="center" alignItems="center" h="60%">
        <Image src={profilePhotoUrl} alt="Profile photo" h="200px" w="auto" />
      </Flex>

      <HStack w="100%" justifyContent="space-around" pb="20px">
        <VStack>
          <Text fontWeight="bold" fontSize="17px">
            {name}
          </Text>
          <Text fontSize="12px" color="gray.500">
            Joined {joinDate}
          </Text>
        </VStack>
        <Button w="40%" bg="gray.500" color="white" borderRadius="30px">
          Pending
        </Button>
      </HStack>
      <HStack w="100%" justifyContent="space-around">
        <Link to="/moderateTeamMember">
          <Button bg="#87d4cd" color="white" w="9vw" onClick={handleDetailsButton}>
            Details
          </Button>
        </Link>
        <Button
          bg="#87d4cd"
          color="white"
          w="9vw"
          onClick={deleteTeamMember}
          disabled={window.localStorage.getItem('profileId') == profileId ? true : false}
        >
          Delete
        </Button>
      </HStack>
    </VStack>
  );
};

export default TeamMember;
