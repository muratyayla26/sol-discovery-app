import { createTheme } from "@mui/material/styles";
import palette from "@/styles/_variables.module.scss";

const themeConstants = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: palette["primary-main"],
    },
    secondary: {
      main: palette["secondary-main"],
    },
    background: {
      default: palette["background-default"],
      paper: palette["background-paper"],
    },
    error: {
      main: palette["error-main"],
    },
    warning: {
      main: palette["warning-main"],
    },
    info: {
      main: palette["info-main"],
    },
    success: {
      main: palette["success-main"],
    },
    text: {
      primary: palette["text-primary"],
      secondary: palette["text-secondary"],
      disabled: palette["text-disabled"],
    },
    divider: palette["divider"],
  },
  spacing: 10,
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    htmlFontSize: 10,
    fontWeightRegular: palette["font-weight-regular"],
    fontWeightMedium: palette["font-weight-medium"],
    fontWeightBold: palette["font-weight-bold"],
    button: {
      lineHeight: 2,
      fontSize: "1.4rem",
      fontWeight: palette["font-weight-medium"],
      textTransform: "none",
    },
    subtitle1: {
      fontSize: "1.8rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const theme = createTheme(themeConstants, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&.inner-card": {
            backgroundColor: palette["inner-card-bg"],
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1.6rem",
          "&:last-child": { padding: "1.6rem" },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          "&.inner-table": {
            backgroundColor: palette["inner-card-bg"],
          },
        },
      },
    },
  },
});

export default theme;
