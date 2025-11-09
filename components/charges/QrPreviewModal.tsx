import React from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

type Props = {
  visible: boolean;
  amount: string;
  description: string;
  reference: string;
  onClose: () => void;
  onShare: () => void;
};

export const QrPreviewModal = ({
  visible,
  amount,
  description,
  reference,
  onClose,
  onShare,
}: Props) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cobro listo</Text>
            <Text style={styles.subtitle}>Referencia {reference}</Text>
          </View>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={Colors.text.primary} />
          </Pressable>
        </View>

        <View style={styles.qrContainer}>
          <Icon name="qr-code-2" size={144} color={Colors.primary.red} />
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Monto</Text>
          <Text style={styles.detailValue}>{amount}</Text>
        </View>

        {description ? (
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Descripción</Text>
            <Text style={styles.detailValue}>{description}</Text>
          </View>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={onShare}>
          <Icon name="share" size={20} color={Colors.complementary.white} />
          <Text style={styles.primaryText}>Compartir</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onClose}>
          <Text style={styles.secondaryText}>Salir</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    padding: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
  },
  detailBox: {
    padding: Spacing.md,
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  detailLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  detailValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  primaryButton: {
    flexDirection: "row",
    gap: Spacing.xs,
    backgroundColor: Colors.primary.red,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.text.light,
    alignItems: "center",
  },
  secondaryText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
});
