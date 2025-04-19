import { createGlobalStyle } from 'styled-components';

// Theme colors - updated for Notion-like aesthetic
export const theme = {
  primary: '#2E75CC',         // More subtle blue similar to Notion
  secondary: '#37A169',       // More muted green
  accent: '#E16259',          // Softer accent red
  background: '#FFFFFF',      // Clean white background
  surface: '#F7F7F7',         // Very subtle gray for cards/surfaces
  text: {
    primary: '#37352F',       // Notion's dark text color
    secondary: '#787774',     // Medium gray for secondary text
    light: '#AEAEAE',         // Light gray for tertiary text
  },
  border: '#EBEBEA',          // Very subtle border color
  danger: '#E16259',          // Muted red
  warning: '#F7B955',         // Softer yellow
  success: '#37A169',         // Muted green
  info: '#2E75CC',            // Muted blue
  shadow: 'rgba(15, 15, 15, 0.05)', // Very subtle shadow
};

// Typography scale - more Notion-like
export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol'",
  heading: {
    1: '2.25rem',    // 36px
    2: '1.875rem',   // 30px
    3: '1.5rem',     // 24px
    4: '1.25rem',    // 20px
    5: '1rem',       // 16px
    6: '0.875rem',   // 14px
  },
  body: {
    large: '1.125rem',   // 18px
    medium: '1rem',      // 16px
    small: '0.875rem',   // 14px
    xsmall: '0.75rem',   // 12px
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Spacing scale (in px)
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  xxl: '3rem',    // 48px
};

// Breakpoints (in px)
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// Media queries
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (max-width: ${breakpoints.wide})`,
};

// Border radius
export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  circle: '50%',
};

// Shadows - updated for Notion-like subtle shadows
export const shadows = {
  sm: `rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px`,
  md: `rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px`,
  lg: `rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 7px 14px, rgba(15, 15, 15, 0.2) 0px 24px 48px`,
  xl: `rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 10px 20px, rgba(15, 15, 15, 0.2) 0px 30px 60px`,
};

// Transitions
export const transitions = {
  fast: '0.15s ease-in-out',
  normal: '0.3s ease-in-out',
  slow: '0.5s ease-in-out',
};

// Global styles - updated for Notion-like look and feel
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    font-family: ${typography.fontFamily};
    font-size: ${typography.body.medium};
    line-height: ${typography.lineHeight.normal};
    color: ${theme.text.primary};
    background-color: ${theme.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: ${spacing.md};
    color: ${theme.text.primary};
  }

  h1 {
    font-size: ${typography.heading[1]};
    letter-spacing: -0.02em;
  }
  
  h2 {
    font-size: ${typography.heading[2]};
    letter-spacing: -0.01em;
  }
  
  h3 {
    font-size: ${typography.heading[3]};
  }
  
  h4 {
    font-size: ${typography.heading[4]};
  }
  
  h5 {
    font-size: ${typography.heading[5]};
  }
  
  h6 {
    font-size: ${typography.heading[6]};
  }

  p {
    margin-bottom: ${spacing.md};
    line-height: 1.6;
  }

  a {
    color: ${theme.primary};
    text-decoration: none;
    transition: color ${transitions.fast};
    
    &:hover {
      color: ${theme.info};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${spacing.md};
  }
`;

export default {
  theme,
  typography,
  spacing,
  breakpoints,
  media,
  borderRadius,
  shadows,
  transitions,
}; 