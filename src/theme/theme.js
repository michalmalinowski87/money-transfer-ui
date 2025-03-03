import { createTheme } from '@mui/material/styles';

// Create a theme instance based on Vitesse.io design with updated color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7043', // Orange for primary
      light: '#ffa270',
      dark: '#f4511e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff7043', // Same orange for secondary
      light: '#ffa270',
      dark: '#f4511e',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50', // Green
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336', // Red
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    info: {
      main: '#1976d2', // Blue
      light: '#64b5f6',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    divider: '#e5e7eb',
    grey: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        // Remove gradient
        containedPrimary: {
          backgroundColor: '#ff7043', // Orange
          '&:hover': {
            backgroundColor: '#f4511e',
          },
        },
        // Make outlined buttons use theme colors correctly
        outlined: {
          borderColor: 'currentColor',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        // Secondary (outlined) specific styles
        outlinedSecondary: {
          color: '#ff7043', // Orange
          borderColor: '#ff7043',
          '&:hover': {
            borderColor: '#f4511e',
            backgroundColor: 'rgba(255, 112, 67, 0.04)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '8px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        sizeSmall: {
          padding: '4px',
        },
      },
    },
  },
});

export default theme;