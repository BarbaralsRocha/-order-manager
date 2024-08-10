// src/theme.ts
import { createTheme } from '@mui/material/styles';

interface NeutralColors {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      light: NeutralColors;
      dark: NeutralColors;
    };
  }
  interface PaletteOptions {
    neutral?: {
      light?: NeutralColors;
      dark?: NeutralColors;
    };
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#fbc105',
      light: '#ffe799',
      dark: '#e0ad00',
    },
    neutral: {
      light: {
        main: '#cccccc',
        light: '#f0f0f0',
        dark: '#b8b8b8',
        contrastText: '#fff',
      },
      dark: {
        main: '#666666',
        light: '#3d3d3d',
        dark: '#1f1f1f',
        contrastText: '#121212',
      },
    },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
