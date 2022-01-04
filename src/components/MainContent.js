import { Heading, HStack } from '@chakra-ui/layout';
import SideBar from './SideBar';
import { useAuthContext } from './AuthContextProvider';
import { Redirect } from 'react-router-dom/';

const MainContent = () => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <HStack>
      <SideBar w="10vw" />
      <Heading w="80vw">Main content</Heading>
    </HStack>
  );
};

export default MainContent;
