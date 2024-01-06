import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "Helevetica Neue, sans-serif",

    h1: {
      fontFamily: 'Inter, sans-serif',
      fontSize:108,
      letterSpacing:20,

      '@media (min-width:720px) and (max-width:1024px)': {
        fontSize:84,
        letterSpacing:15,
      },


      '@media (min-width:1024px) and (max-width:1280px)': {
        fontSize:96,
        letterSpacing:15,
      },

      '@media (min-width:1280px) and (max-width:1440px)': {
        fontSize:102,
        letterSpacing:15,
      },



      '@media (max-width:600px)': {
        fontSize: 32,
        letterSpacing:1,
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
