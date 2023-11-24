import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const MainPanel = {
  baseStyle: {
    float: 'right',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    maxHeight: '100%',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    transitionDuration: '.2s, .2s, .35s',
    transitionProperty: 'top, bottom, width',
    transitionTimingFunction: 'linear, linear, ease',
  },
  variants: {
    main: (props: any) => ({
      float: 'right',
    }),
    rtl: (props: any) => ({
      float: 'left',
    }),
  },
  defaultProps: {
    variant: 'main',
  },
};

const PanelContainer = {
  baseStyle: {
    p: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
};

const PanelContent = {
  baseStyle: {
    ms: 'auto',
    me: 'auto',
    ps: '15px',
    pe: '15px',
  },
};

const Card = {
  baseStyle: {
    p: '22px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
  },
  variants: {
    panel: (props: any) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      width: '100%',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      borderRadius: '15px',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

const CardBody = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const CardHeader = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const theme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
  components: {
    Button: {
      variants: {
        'with-shadow': {
          boxShadow: '0 0 2px 2px #efdfde',
        },
        'no-hover': {
          _hover: {
            boxShadow: 'none',
          },
        },
        'transparent-w-icon': {
          bg: 'transparent',
          fontWeight: 'bold',
          borderRadius: 'inherit',
          cursor: 'pointer',
          _hover: 'none',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
      },
      baseStyle: {
        borderRadius: '15px',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    Link: {
      decoratuion: 'none',
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    Drawer: {
      variants: {
        'with-shadow': {
          placement: 'right',
          boxShadow: '0 0 2px 2px #efdfde',
          bgColor: 'red',
        },
      },
    },
    Badge: {
      sizes: {
        md: {
          width: '65px',
          height: '25px',
        },
      },
      baseStyle: {
        textTrasnform: 'capitalize',
      },
    },
    FormErrorMessage: {
      baseStyle: {
        color: 'red.500',
        fontWeight: 'bold',
      },
    },
    MainPanel,
    PanelContainer,
    PanelContent,
    Card,
    CardBody,
    CardHeader,
  },
  fonts: {
    heading: `'Irish Grover', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
  colors: {
    gray: {
      700: '#1f2733',
    },
    brand: {
      100: '#4fd1c5',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
        fontFamily: "'Ubuntu', sans-serif",
      },
      html: {
        fontFamily: "'Ubuntu', sans-serif",
      },
    }),
  },
});

export default theme;
