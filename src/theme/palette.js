// Discord-like color palette
const PRIMARY = {
    lighter: '#7289DA',
    light: '#5E78D5',
    main: '#5865F2',
    dark: '#4752C4',
    darker: '#3C45A5',
  };
  
  const SECONDARY = {
    lighter: '#818CF8',
    light: '#6366F1',
    main: '#4F46E5',
    dark: '#4338CA',
    darker: '#3730A3',
  };
  
  const GREY = {
    100: '#F2F3F5',
    200: '#EBEDEF',
    300: '#E3E5E8',
    400: '#D4D7DC',
    500: '#B9BBBE',
    600: '#8E9297',
    700: '#4F545C',
    800: '#36393F',
    900: '#202225',
  };
  
  const palette = {
    light: {
      mode: 'light',
      primary: PRIMARY,
      secondary: SECONDARY,
      grey: GREY,
      background: {
        paper: '#FFFFFF',
        default: '#F2F3F5',
      },
      text: {
        primary: GREY[900],
        secondary: GREY[700],
      },
    },
    dark: {
      mode: 'dark',
      primary: PRIMARY,
      secondary: SECONDARY,
      grey: GREY,
      background: {
        paper: GREY[800],
        default: GREY[900],
      },
      text: {
        primary: '#FFFFFF',
        secondary: GREY[500],
      },
    },
  };
  
  export default palette;