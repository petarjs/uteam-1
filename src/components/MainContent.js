import { Box } from '@chakra-ui/layout';
import SideBar from './SideBar';
import Questions from './Questions';
import Pending from './Pending';
import CompanyInfo from './CompanyInfo';
import Team from './Team';
import MyProfile from './MyProfile';
import EditQuestions from './EditQuestion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const MainContent = () => {
  return (
    <Router>
      <Box>
        <SideBar w="10vw" pos="fixed" />
        <Switch>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/pending">
            <Pending />
          </Route>
          <Route path="/companyInfo">
            <CompanyInfo />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/myProfile">
            <MyProfile />
          </Route>
          <Route path="/editQuestions">
            <EditQuestions />
          </Route>
        </Switch>
      </Box>
    </Router>
  );
};

export default MainContent;
