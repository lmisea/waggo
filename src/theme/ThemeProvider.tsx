import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import { theme, Theme } from "./index";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useRNColorScheme();
  // Inicializamos con el valor del sistema
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  // Si el usuario hizo override manual, usamos eso. Si no, seguimos al sistema.
  const isDark =
    manualOverride !== null ? manualOverride : systemColorScheme === "dark";

  const currentTheme = useMemo(() => {
    return isDark ? theme.dark : theme.light;
  }, [isDark]);

  const toggleTheme = () => {
    setManualOverride((prev) => (prev !== null ? !prev : !isDark));
  };

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme: currentTheme,
      isDark,
      toggleTheme,
    }),
    [currentTheme, isDark],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context.theme;
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeToggle debe usarse dentro de un ThemeProvider");
  }
  return { isDark: context.isDark, toggleTheme: context.toggleTheme };
};
