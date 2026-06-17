import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface CustomDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  error,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    // En Android, ocultamos el selector inmediatamente tras elegir la fecha
    // Esto para evitar que a veces el calendario no se cierre al seleccionar una fecha
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Formato de fecha largo y con la primera letra en mayúscula
  const formatDate = (date: Date) => {
    const dateString = date.toLocaleDateString("es-VE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        Fecha Preferida
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShow(!show)}
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.dateText, { color: theme.colors.textPrimary }]}>
          {formatDate(value)}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          minimumDate={new Date()}
          onValueChange={handleDateChange}
          onDismiss={() => setShow(false)}
          style={Platform.OS === "ios" ? { marginTop: 8 } : null}
        />
      )}

      {show && Platform.OS === "ios" && (
        <TouchableOpacity
          style={[
            styles.closeIosBtn,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setShow(false)}
        >
          <Text style={styles.closeIosText}>Confirmar Fecha</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  closeIosBtn: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  closeIosText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
