export const Colors = {
  primary: {
    red: '#ed2225',      // Pantone 485C - Rojo Davivienda
    blue: '#0082C4',     // Pantone 3005C - Azul Davivienda
    yellow: '#ffe01c',   // Pantone 109C - Amarillo Davivienda
    orange: '#f8991d',   // Pantone 144C - Naranja Davivienda
    black: '#000000',    // Black C - Negro
  },
  complementary: {
    teal: '#00a094',     // Pantone 322 - Verde azulado
    orange144: '#f8991d',// Pantone 144C - Naranja
    orange2: '#F58220',  // Naranja 2
    yellow109: '#ffe01c',// Pantone 109C - Amarillo
    yellow2: '#00a094',  // Amarillo 2 (Teal)
    gray1: '#666666',    // Gris 1
    gray2: '#BCBEC0',    // Gris 2
    white: '#FFFFFF',    // Blanco
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#BCBEC0',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#BCBEC0',
  },
  status: {
    success: '#00a094',
    warning: '#f8991d',
    error: '#dd141d',
    info: '#0082C4',
  },
  ui: {
    border: '#E0E0E0',
    divider: '#EEEEEE',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export type ColorScheme = typeof Colors;

