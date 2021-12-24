import { Heading, Text, Flex, Divider, Avatar, IconButton } from '@chakra-ui/react';

import { useState } from 'react';

import { FiMenu, FiBriefcase, FiUser } from 'react-icons/fi';
import { FaScribd } from 'react-icons/fa';
import { BsPatchQuestion } from 'react-icons/bs';
import { RiTeamLine } from 'react-icons/ri';
import NavItem from './NavItems';

const SideBar = () => {
  const [navSize, changeNaveSize] = useState('small');
  return (
    <Flex
      pos="sticky"
      h="90vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
      bgGradient="linear(to-t, #97FFCF, #38C6BD)"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          color="white"
          background="none"
          _hover={{ textDecor: 'none', backgroundColor: '#97FFCF' }}
          mt={5}
          _focus="outline-none"
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === 'small') changeNaveSize('large');
            else changeNaveSize('small');
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FaScribd}
          title="Pending for approval"
          description="Description for Pending for approval item"
        />
        <NavItem
          navSize={navSize}
          icon={RiTeamLine}
          title="Team"
          description="Description for Team item"
        />
        <NavItem
          navSize={navSize}
          icon={BsPatchQuestion}
          title="Questons"
          description="Description for Questions item"
        />
        <NavItem
          navSize={navSize}
          icon={FiBriefcase}
          title="Company Info"
          description="Description for Company info item"
        />
        <NavItem
          navSize={navSize}
          icon={FiUser}
          title="My Profile"
          description="Description for My profile item"
        />
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Avatar size="sm" />
          <Flex flexDir="column" ml={4} display={navSize == 'small' ? 'none' : 'flex'}>
            <Heading as="h3" size="sm" color="white">
              UserName
            </Heading>
            <Text color="white">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
