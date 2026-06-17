import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../App";
import { CategoryChips } from "../components/CategoryChips";
import { ServiceCard } from "../components/ServiceCard";
import { WaggoLogo } from "../components/WaggoLogo";
import { useServices } from "../hooks/useServices";
import { useTheme, useThemeToggle } from "../theme/ThemeProvider";
import { ServiceCategory } from "../types/service";

const CATEGORIES: ServiceCategory[] = [
  "Todos",
  "Paseo",
  "Peluquería",
  "Veterinario",
  "Concurso",
  "Entrenamiento",
  "Guardería",
];

export default function HomeScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeToggle();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Home">>();

  const {
    services,
    featuredServices,
    isLoading,
    error,
    activeCategory,
    changeCategory,
    refetch,
  } = useServices();

  const renderContent = () => {
    // Nuestro estado de cargando con un mensaje bonito
    if (isLoading) {
      return (
        <View style={styles.centerFlex}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[styles.loadingText, { color: theme.colors.textSecondary }]}
          >
            Buscando a los mejores profesionales... 🐾
          </Text>
        </View>
      );
    }

    // En caso de un error al cargar los servicios
    if (error) {
      return (
        <View style={styles.centerFlex}>
          <Ionicons
            name="alert-circle-outline"
            size={56}
            color={theme.colors.error}
            style={{ marginBottom: theme.spacing.md }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.sm,
            }}
          >
            ¡No cargó la lista de servicios! 😿
          </Text>

          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: theme.colors.textSecondary,
              lineHeight: 20,
              paddingHorizontal: theme.spacing.md,
              marginBottom: theme.spacing.lg,
            }}
          >
            Revisa tu conexión a internet e inténtalo de nuevo para seguir
            consintiendo a tu peludo.
          </Text>

          <TouchableOpacity
            style={[
              styles.retryButton,
              {
                backgroundColor: theme.colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 24,
              },
            ]}
            onPress={refetch}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.retryButtonText,
                { color: "#FFFFFF", fontWeight: "bold" },
              ]}
            >
              Intentar de nuevo
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // En caso de que la lista de servicios esté vacía
    if (services.length === 0) {
      return (
        <View style={styles.centerFlex}>
          <Ionicons
            name="paw-outline"
            size={56}
            color={theme.colors.primary}
            style={{ marginBottom: theme.spacing.md }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.sm,
            }}
          >
            Olfateamos por todas partes... 🐾
          </Text>

          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: theme.colors.textSecondary,
              lineHeight: 20,
              paddingHorizontal: theme.spacing.md,
            }}
          >
            Pero no encontramos servicios de "{activeCategory}" disponibles hoy.
            ¡Prueba explorando otra categoría para consentir a tu mascota!
          </Text>
        </View>
      );
    }

    // En caso de que todos los servicios se carguen correctamente
    return (
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          featuredServices.length > 0 ? (
            <View
              style={{
                marginBottom: theme.spacing.md,
                marginTop: theme.spacing.sm,
              }}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.sm,
                  },
                ]}
              >
                Servicios Destacados ⭐
              </Text>
              <FlatList
                horizontal
                data={featuredServices}
                keyExtractor={(item) => `feat-${item.id}`}
                style={{ flexGrow: 0 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ width: 230, marginRight: theme.spacing.sm }}>
                    <ServiceCard
                      service={item}
                      variant="featured"
                      onPress={() =>
                        navigation.navigate("Detail", { serviceId: item.id })
                      }
                    />
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={{ height: theme.spacing.md }} />
          )
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            variant="standard"
            onPress={() =>
              navigation.navigate("Detail", { serviceId: item.id })
            }
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
        style={styles.servicesList}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        }}
      >
        <View style={styles.header}>
          <WaggoLogo size="md" />
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.themeToggle, { borderColor: theme.colors.border }]}
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={20}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: theme.spacing.sm }}>
          <CategoryChips
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={changeCategory}
          />
        </View>
      </View>

      <View style={styles.mainContent}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  mainContent: { flex: 1 },
  servicesList: { flex: 1 },
  centerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  loadingText: { marginTop: 16, fontSize: 16 },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  emptyText: { fontSize: 16, textAlign: "center", marginTop: 16 },
});
