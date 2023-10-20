import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: `'Irish Grover', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
  colors: {
    brand: {
      100: '#DFDF9E',
    },
    accent: '#DFDF9E',
    primary: '#00000',
    secondary: '#C8812B',
    whiteButtons: '#C8812B',
    text: 'black',
    bgcard: 'rgba(223,223,158, 0.45)',
    inputbg: 'rgba(200,129,43, 0.15)',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(theme.colors.primary, theme.colors.primary)(props),
        color: theme.colors.secondary,
      },
    }),
  },
  colorScheme: {
    tabsbtn: '#DFDF9E',
  },
});

export default theme;
