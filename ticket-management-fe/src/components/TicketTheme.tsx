import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const TicketTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Set the primary color to a ticket-related shade of blue
    },
    secondary: {
      main: "#f50057", // Set the secondary color to a ticket-related shade of red
    },
    background: {
      default: "#FFFFFF", // Set the default background color
      paper: "#ffffff", // Set the background color for paper components
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Set a common font-family for the entire app
    h1: {
      fontSize: "2rem", // Set the font-size for heading level 1
      fontWeight: 600, // Set the font-weight for heading level 1
      color: "#1e88e5", // Set the color for heading level 1 (primary color)
    },
    h2: {
      fontSize: "1.5rem", // Set the font-size for heading level 2
      fontWeight: 600, // Set the font-weight for heading level 2
      color: "#f50057", // Set the color for heading level 2 (secondary color)
    },
    body1: {
      fontSize: "1rem", // Set the font-size for regular text
    },
    // Add more typography styles as needed
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            borderRadius: "8px", // Adjust the value for the desired border radius
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          cursor: "pointer",
          borderRadius: "8px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          // Add the background color here
          backgroundColor: "#3f51b5",
          textAlign: "center",
          color: "white",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: "8px", // Set the border-radius for primary contained buttons
          textTransform: "uppercase", // Convert text to uppercase for primary buttons
        },
        containedSecondary: {
          borderRadius: "8px", // Set the border-radius for secondary contained buttons
          textTransform: "uppercase", // Convert text to uppercase for secondary buttons
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "Roboto, Arial, sans-serif", // Set the font-family for input fields
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: "4px", // Set the border-radius for the select component
        },
      },
    },
    // Add more component customizations as needed
  },
  // Add the backgroundImage property to the background object
});

export default TicketTheme;
