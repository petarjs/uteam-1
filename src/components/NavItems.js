import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import NavHoverBox from '../components/NavHoverBox';
import { NAV_SIZE } from '../constants/index';
import { useState } from 'react';
import { useAuthContext } from './AuthContextProvider';

const NavItem = ({ navSize, title, icon, description }) => {
  const { setActiveMainContent } = useAuthContext();
  const [active, setActive] = useState(false);
  const handleSetActiveChange = () => setActive(!active);
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == NAV_SIZE.SMALL ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
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
          <MenuButton
            w="100%"
            onClick={() => {
              setActiveMainContent(title);
            }}
          >
            <Flex>
              <Icon color="white" as={icon} fontSize="xl" />
              <Text ml={5} display={navSize == NAV_SIZE.SMALL ? 'none' : 'flex'} color="white">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavItem;
