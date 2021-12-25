import { Heading } from "@chakra-ui/layout";

const MainContent = ({setActiveOption}) => {
  return (
    {
        !isLoggedIn ?
        <Heading>User is logged in</Heading> 
        :
        <Heading>Choose item in menu</Heading> 
    }
  );
};

export default MainContent;
