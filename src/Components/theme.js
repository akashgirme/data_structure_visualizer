import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "Helevetica Neue, sans-serif",

    h1: {
      fontFamily: 'Inter, sans-serif',
      fontSize:108,
      letterSpacing:20,

      '@media (max-width:600px)': {
        fontSize: 32,
        letterSpacing:1,
      },

      '@media (min-width:600px) and (max-width:768px)': {
        fontSize:60,
        letterSpacing:6,
      },


      '@media (min-width:769px) and (max-width:1100px)': {
        fontSize:76,
        letterSpacing:10,
      },


      '@media (min-width:1110px) and (max-width:1280px)': {
        fontSize:96,
        letterSpacing:15,
      },

      '@media (min-width:1280px) and (max-width:1440px)': {
        fontSize:102,
        letterSpacing:15,
      },

    },

    h4: {

      '@media (max-width:600px)': {
        fontSize:18,
        letterSpacing:1,
      },

    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

});

export default Theme;
