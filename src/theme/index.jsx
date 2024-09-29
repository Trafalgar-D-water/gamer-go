import { useState, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

export default function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light'); // Default to light theme

  const themeOptions = useMemo(
    () => ({
      palette: themeMode === 'light' ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: themeMode === 'light' ? shadows.light : shadows.dark,
      customShadows: themeMode === 'light' ? customShadows.light : customShadows.dark,
    }),
    [themeMode]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  // Function to toggle theme
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}