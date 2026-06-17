import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import { mockServices } from "../data/mockData";
import { useTheme } from "../theme/ThemeProvider";

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const theme = useTheme();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();

  const { serviceId } = route.params;
  const service = mockServices.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.error }}>
          Servicio no encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  const handleBooking = () => {
    if (service.available) {
      navigation.navigate("Booking", { serviceId: service.id });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
          Detalle del Servicio
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          padding: theme.spacing.md,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topRow, { marginBottom: theme.spacing.md }]}>
          <Text
            style={[
              styles.categoryBadge,
              {
                backgroundColor: theme.colors.primary + "15",
                color: theme.colors.primary,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
              },
            ]}
          >
            {service.category}
          </Text>
          <Text style={[styles.price, { color: theme.colors.primary }]}>
            {service.currency} {service.price}
          </Text>
        </View>

        <Text
          style={[
            styles.name,
            { color: theme.colors.textPrimary, marginBottom: theme.spacing.xs },
          ]}
        >
          {service.name}
        </Text>

        <Text
          style={[
            styles.provider,
            {
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.md,
            },
          ]}
        >
          Ofrecido por: {service.providerName}
        </Text>

        <View style={[styles.ratingRow, { marginBottom: theme.spacing.lg }]}>
          <Ionicons
            name="star"
            size={18}
            color="#FFD700"
            style={{ marginRight: 4 }}
          />
          <Text
            style={[styles.ratingText, { color: theme.colors.textPrimary }]}
          >
            {service.rating} ({service.reviewCount} opiniones)
          </Text>
          <Text style={[styles.divider, { color: theme.colors.border }]}>
            {" "}
            •{" "}
          </Text>
          <Ionicons
            name="time-outline"
            size={18}
            color={theme.colors.textSecondary}
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: theme.colors.textSecondary }}>
            {service.durationMinutes} min
          </Text>
        </View>

        <View
          style={[
            styles.infoSection,
            {
              borderTopColor: theme.colors.border,
              paddingTop: theme.spacing.md,
            },
          ]}
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
            Descripción del servicio
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.textSecondary }]}
          >
            {service.description}
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            padding: theme.spacing.md,
          },
        ]}
      >
        {!service.available && (
          <Text
            style={[
              styles.unavailableText,
              { color: theme.colors.error, marginBottom: theme.spacing.sm },
            ]}
          >
            ⚠️ Este servicio no está disponible temporalmente.
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: service.available
                ? theme.colors.primary
                : theme.colors.disabled,
            },
          ]}
          onPress={handleBooking}
          disabled={!service.available}
          activeOpacity={0.8}
        >
          <Text style={styles.actionBtnText}>Reservar Ahora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  scroll: { flex: 1 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: { borderRadius: 12, fontSize: 13, fontWeight: "bold" },
  price: { fontSize: 24, fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold" },
  provider: { fontSize: 15 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 14, fontWeight: "600" },
  divider: { fontSize: 16 },
  infoSection: { borderTopWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 15, lineHeight: 22 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  },
  unavailableText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
  actionBtn: {
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
