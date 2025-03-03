import React from 'react';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import theme from '../src/theme/theme';

// Storybook decorator - make sure to pass args from controls to story
export const decorators = [
  (Story, context) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ margin: '1em' }}>
          <Story {...context.args} />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Show all controls by default
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f9fafb',
      },
      {
        name: 'dark',
        value: '#111827',
      },
    ],
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1366px',
          height: '768px',
        },
      },
    },
  },
};