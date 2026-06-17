import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Service } from "../types/service";

type CardVariant = "standard" | "featured";

interface ServiceCardProps {
  service: Service;
  variant: CardVariant;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant,
  onPress,
}) => {
  const theme = useTheme();
  const isFeatured = variant === "featured";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      activeOpacity={0.7}
    >
      {/* Servicios normales */}
      {!isFeatured && (
        <>
          <View style={styles.header}>
            <Text
              style={[styles.name, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              {service.name}
            </Text>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              {service.currency} {service.price}
            </Text>
          </View>
          <Text
            style={[styles.provider, { color: theme.colors.textSecondary }]}
          >
            {service.providerName} • {service.durationMinutes} min
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
            numberOfLines={2}
          >
            {service.description}
          </Text>
          <Text style={[styles.rating, { color: theme.colors.textPrimary }]}>
            ⭐ {service.rating} ({service.reviewCount})
          </Text>
        </>
      )}

      {/* Servicios Destacados */}
      {isFeatured && (
        <View style={styles.featuredContent}>
          <Text
            style={[styles.nameFeatured, { color: theme.colors.textPrimary }]}
            numberOfLines={1}
          >
            {service.name}
          </Text>

          <View style={styles.featuredBottomRow}>
            <Text
              style={[
                styles.categoryFeatured,
                { color: theme.colors.textSecondary },
              ]}
            >
              {service.category}
            </Text>
            <Text
              style={[styles.priceFeatured, { color: theme.colors.primary }]}
            >
              {service.currency} {service.price}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  provider: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
  },

  // Estilos específicos para los servicios destacados
  featuredContent: {
    width: "100%",
  },
  nameFeatured: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featuredBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryFeatured: {
    fontSize: 13,
    fontWeight: "600",
  },
  priceFeatured: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
