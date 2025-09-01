// theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
              paper: "#fff",
            },
            text: {
              primary: "#000",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#fff",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition:
              "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease",
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: "color 0.4s ease",
          },
        },
      },
    },
  });
