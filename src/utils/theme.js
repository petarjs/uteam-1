import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    prettyOrange: '#FFEF78',
    prettyPink: '#FF95C5',
  },
});

export default theme;
