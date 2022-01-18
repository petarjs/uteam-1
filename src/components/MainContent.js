import { Heading, HStack } from '@chakra-ui/layout';
import SideBar from './SideBar';

const MainContent = () => {
  return (
    <HStack>
      <SideBar w="10vw" />
      <Heading w="80vw">Main content</Heading>
    </HStack>
  );
};

export default MainContent;
