import { darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";

export const theme = {
  light: {
    colors: lightColors,
    spacing,
  },
  dark: {
    colors: darkColors,
    spacing,
  },
};

export type Theme = typeof theme.light;
