import { Heading, Text, Flex, Divider, Avatar, IconButton } from '@chakra-ui/react';

import { useState } from 'react';

import { FiMenu, FiBriefcase, FiUser } from 'react-icons/fi';
import { FaScribd } from 'react-icons/fa';
import { BsPatchQuestion } from 'react-icons/bs';
import { RiTeamLine } from 'react-icons/ri';
import NavItem from './NavItems';
import { NAV_SIZE } from '../constants/index';
import { useAuthContext } from './AuthContextProvider';
const SideBar = () => {
  const [navSize, changeNavSize] = useState(NAV_SIZE.SMALL);

  const handleSideMenuSizeChange = () => {
    if (navSize === NAV_SIZE.SMALL) {
      changeNavSize(NAV_SIZE.LARGE);
    } else {
      changeNavSize(NAV_SIZE.SMALL);
    }
  };
  const { profilePhoto, userName } = useAuthContext();
  const navItems = [
    {
      title: 'Pending',
      description: 'Description for Pending for approval item',
      icon: FaScribd,
    },
    {
      title: 'Team',
      description: 'Description for Team item',
      icon: RiTeamLine,
    },
    {
      title: 'Questions',
      description: 'Description for Questions item',
      icon: BsPatchQuestion,
    },
    {
      title: 'Company Info',
      description: 'Description for Company Info item',
      icon: FiBriefcase,
    },
    {
      title: 'My Profile',
      description: 'Description for My Profile item',
      icon: FiUser,
    },
  ];
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
        alignItems={navSize == NAV_SIZE.SMALL ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          color="white"
          background="none"
          _hover={{ textDecor: 'none', backgroundColor: '#97FFCF' }}
          mt={5}
          _focus="outline-none"
          icon={<FiMenu />}
          onClick={(e) => handleSideMenuSizeChange(e)}
        />

        {navItems.map(({ title, description, icon }, index) => (
          <NavItem
            key={index}
            navSize={navSize}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == NAV_SIZE.SMALL ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == NAV_SIZE.SMALL ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Avatar width="50px" height="50px" src={profilePhoto} />

          <Flex flexDir="column" ml={4} display={navSize == NAV_SIZE.SMALL ? 'none' : 'flex'}>
            <Heading as="h3" size="sm" color="white">
              {userName}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
