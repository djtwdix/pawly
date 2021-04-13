import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

export const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#ff00b8",
      },
      track: {
        color: "#ff00b8",
      },
      rail: {
        color: "gray",
      },
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ff00b8",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#fd93ff",
      main: "#ff00b8",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

/* #fd93ff, #ff6fd7, #ff00b8; */
