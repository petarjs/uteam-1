import { Box } from '@chakra-ui/layout';
import SideBar from './SideBar';
import { useAuthContext } from './AuthContextProvider';
import Questions from './Questions';
import Pending from './Pending';
import CompanyInfo from './CompanyInfo';
import Team from './Team';
import MyProfile from './MyProfile';

const MainContent = () => {
  const { activeMainContent } = useAuthContext();
  const component = () => {
    switch (activeMainContent) {
      case 'Questions':
        return <Questions />;
      case 'Pending':
        return <Pending />;
      case 'My Profile':
        return <MyProfile />;
      case 'Team':
        return <Team />;
      case 'Company Info':
        return <CompanyInfo />;
      default:
        return <Pending />;
    }
  };

  return (
    <Box>
      <SideBar w="10vw" pos="fixed" />

      {component()}
    </Box>
  );
};

export default MainContent;
