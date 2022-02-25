const { Heading, VStack, Flex } = require('@chakra-ui/react');
import TeamMember from './TeamMember';
import { useAuthContext } from './AuthContextProvider';

const Pending = () => {
  const { allCompaniesProfilesResponse } = useAuthContext();

  return (
    <VStack p="14vh">
      <Heading
        mb={['32px !important']}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
        bgClip="text"
        position="relative"
        zIndex="1"
        pb="6px"
      >
        Pending for approval
      </Heading>

      <Flex width="100%" wrap="wrap" rowGap="40px" columnGap="10px" justifyContent="space-between">
        {allCompaniesProfilesResponse
          ? allCompaniesProfilesResponse.map((profile) =>
              profile.attributes.status === 'pending' ? (
                <TeamMember
                  key={profile.id}
                  profileId={profile.id}
                  name={profile.attributes.name}
                  joined={profile.attributes.createdAt}
                  profilePhoto={profile.attributes.profilePhoto.data.attributes.url}
                />
              ) : null
            )
          : null}
      </Flex>
    </VStack>
  );
};

export default Pending;
