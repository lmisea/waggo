import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface BookingStatusModalProps {
  visible: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({
  visible,
  type,
  title,
  message,
  onClose,
}) => {
  const theme = useTheme();
  const isSuccess = type === "success";

  const iconName = isSuccess ? "checkmark-circle" : "alert-circle";
  const iconColor = isSuccess ? theme.colors.primary : theme.colors.error;

  const badgeBg = isSuccess
    ? theme.colors.primary + "15"
    : theme.colors.error + "15";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              padding: theme.spacing.lg,
            },
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: badgeBg }]}>
            <Ionicons name={iconName} size={54} color={iconColor} />
          </View>

          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {title}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: theme.colors.textSecondary,
                marginTop: theme.spacing.sm,
              },
            ]}
          >
            {message}
          </Text>

          {/*
            El botón siempre dice "Entendido" porque tanto en éxito como en error
            el usuario debe cerrar el modal. El botón no reintenta la reserva.
          */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isSuccess
                  ? theme.colors.primary
                  : theme.colors.error,
                marginTop: theme.spacing.xl,
              },
            ]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
