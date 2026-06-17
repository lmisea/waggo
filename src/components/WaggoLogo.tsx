import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface WaggoLogoProps {
  size?: "sm" | "md" | "lg";
}

export const WaggoLogo: React.FC<WaggoLogoProps> = ({ size = "md" }) => {
  const theme = useTheme();

  const isLg = size === "lg";
  const isSm = size === "sm";

  const fontSize = isLg ? 36 : isSm ? 20 : 26;
  const iconSize = isLg ? 28 : isSm ? 16 : 22;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { fontSize, color: theme.colors.textPrimary }]}
      >
        Wag
        <Text style={{ color: theme.colors.primary }}>go</Text>
      </Text>
      <View style={[styles.iconWrapper, { marginTop: isLg ? 6 : 4 }]}>
        <Ionicons name="paw" size={iconSize} color={theme.colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "900",
    letterSpacing: -1,
  },
  iconWrapper: {
    marginLeft: 2,
    transform: [{ rotate: "15deg" }],
  },
});
