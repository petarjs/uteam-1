import { Flex, Text, Icon, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavHoverBox from '../components/NavHoverBox';
import { NAV_SIZE } from '../constants/index';
import { useState } from 'react';
import { useAuthContext } from './AuthContextProvider';

const NavItem = ({ navSize, title, icon, description, link }) => {
  const { setActiveMainContent } = useAuthContext();
  const [active, setActive] = useState(false);
  const handleSetActiveChange = () => setActive(!active);
  const handleIconButton = () => {
    setActiveMainContent(title);
    window.localStorage.removeItem('currentUserName');
    window.localStorage.removeItem('currentProfileId');
  };
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == NAV_SIZE.SMALL ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Flex
          onClick={(e) => handleSetActiveChange(e)}
          p={3}
          borderRadius={8}
          color="black"
          _hover={{ textDecor: 'none', bg: '#97FFCF', color: '#97FFCF' }}
          background="none"
          _active={{
            bg: '#97FFCF',
          }}
          _focus={{
            bg: '#97FFCF',
          }}
          w={navSize == NAV_SIZE.LARGE && '100%'}
        >
          <Link to={link}>
            <MenuButton w="100%" onClick={handleIconButton}>
              <Flex>
                <Icon color="white" as={icon} fontSize="xl" />

                <Text ml={5} display={navSize == NAV_SIZE.SMALL ? 'none' : 'flex'} color="white">
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Flex>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavItem;
