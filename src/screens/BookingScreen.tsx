import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../App";
import { BookingStatusModal } from "../components/BookingStatusModal";
import { CustomDatePicker } from "../components/CustomDatePicker";
import { mockServices } from "../data/mockData";
import { submitBooking } from "../services/api";
import { useTheme } from "../theme/ThemeProvider";
import { BookingFormData, BookingSchema } from "../types/booking";

type BookingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Booking"
>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, "Booking">;

export default function BookingScreen() {
  const theme = useTheme();
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const route = useRoute<BookingScreenRouteProp>();
  const { serviceId } = route.params;

  const service = mockServices.find((s) => s.id === serviceId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    visible: false,
    type: "success",
    title: "",
    message: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      date: new Date(),
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await submitBooking(data);
      if (response.success) {
        setModalConfig({
          visible: true,
          type: "success",
          title: "¡Reserva Exitosa! 🐾",
          message: `En Waggo agendamos con éxito tu cita de "${service?.name}" para el ${data.date.toLocaleDateString("es-VE")}. ¡Gracias por confiar en nosotros!`,
        });
      }
    } catch (err: any) {
      setModalConfig({
        visible: true,
        type: "error",
        title: "Error en la Reserva",
        message:
          "Waggo no logró completar la solicitud en este momento. Por favor, inténtalo de nuevo para asegurar el cupo de tu mascota.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) return null;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          { borderColor: theme.colors.border, padding: theme.spacing.md },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
          Solicitud de Servicio
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ padding: theme.spacing.md, gap: theme.spacing.lg }}>
          <View
            style={[
              styles.serviceSummary,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                padding: theme.spacing.md,
              },
            ]}
          >
            <Text
              style={[styles.serviceName, { color: theme.colors.textPrimary }]}
            >
              {service.name}
            </Text>
            <Text
              style={[
                styles.serviceInfo,
                {
                  color: theme.colors.textSecondary,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              Proveedor: {service.providerName} • {service.durationMinutes} min
            </Text>
            <Text
              style={[
                styles.servicePrice,
                { color: theme.colors.primary, marginTop: theme.spacing.sm },
              ]}
            >
              {service.currency} {service.price}
            </Text>
          </View>

          <View style={{ gap: theme.spacing.md }}>
            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  {
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Nombre Completo
              </Text>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: errors.fullName
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.textPrimary,
                      },
                    ]}
                    placeholder="Ingresa tu nombre completo"
                    placeholderTextColor={theme.colors.textSecondary}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.fullName && (
                <Text
                  style={[
                    styles.errorText,
                    { color: theme.colors.error, marginTop: theme.spacing.xs },
                  ]}
                >
                  {errors.fullName.message}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text
                style={[
                  styles.label,
                  {
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.xs,
                  },
                ]}
              >
                Teléfono de Contacto
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: errors.phone
                          ? theme.colors.error
                          : theme.colors.border,
                        color: theme.colors.textPrimary,
                      },
                    ]}
                    placeholder="Ej. 04121234567"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="phone-pad"
                    maxLength={11}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.phone && (
                <Text
                  style={[
                    styles.errorText,
                    { color: theme.colors.error, marginTop: theme.spacing.xs },
                  ]}
                >
                  {errors.phone.message}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    error={errors.date?.message}
                  />
                )}
              />
            </View>
          </View>
        </View>

        <View style={{ padding: theme.spacing.md }}>
          <TouchableOpacity
            style={[
              styles.submitBtn,
              {
                backgroundColor:
                  isValid && !isSubmitting
                    ? theme.colors.primary
                    : theme.colors.disabled,
                padding: theme.spacing.md,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitBtnText}>
              {isSubmitting ? "Procesando Solicitud..." : "Confirmar Reserva"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BookingStatusModal
        visible={modalConfig.visible}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => {
          setModalConfig((prev) => ({ ...prev, visible: false }));
          if (modalConfig.type === "success") {
            navigation.navigate("Home");
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  scrollContent: { flexGrow: 1, justifyContent: "space-between" },
  serviceSummary: { borderRadius: 12, borderWidth: 1 },
  serviceName: { fontSize: 20, fontWeight: "bold" },
  serviceInfo: { fontSize: 14 },
  servicePrice: { fontSize: 16, fontWeight: "600" },
  inputGroup: { width: "100%" },
  label: { fontSize: 14, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
  },
  errorText: { fontSize: 12, fontWeight: "500" },
  submitBtn: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    marginTop: 16,
  },
  submitBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
