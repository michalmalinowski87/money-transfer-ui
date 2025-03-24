import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

// Import your theme configuration
import themeConfig from './theme';

// Create the theme instance
const theme = createTheme(themeConfig);

/**
 * Custom theme provider that disables MUI's Emotion cache
 * This ensures styles are always fresh and not cached between renders
 */
export const ThemeProvider = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme} disableStylesGeneration={false}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;