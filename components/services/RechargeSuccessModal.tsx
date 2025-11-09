import React from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { formatCurrency } from "@/utils/mockData";

type Props = {
  visible: boolean;
  provider: string;
  phoneNumber: string;
  amount: number;
  reference: string;
  onClose: () => void;
};

export const RechargeSuccessModal = ({
  visible,
  provider,
  phoneNumber,
  amount,
  reference,
  onClose,
}: Props) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.checkCircle}>
          <Icon name="check" size={48} color={Colors.complementary.white} />
        </View>

        <Text style={styles.title}>¡Recarga exitosa!</Text>
        <Text style={styles.subtitle}>Tu saldo ya fue acreditado.</Text>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Monto</Text>
          <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Operadora</Text>
            <Text style={styles.detailValue}>{provider}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Número</Text>
            <Text style={styles.detailValue}>+506 {phoneNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Referencia</Text>
            <Text style={styles.detailValue}>{reference}</Text>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={onClose}>
          <Text style={styles.primaryButtonText}>Listo</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  container: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.status.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
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
  amountSection: {
    alignItems: "center",
    marginVertical: Spacing.sm,
  },
  amountLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  amount: {
    fontSize: Typography.sizes["4xl"],
    color: Colors.primary.red,
    fontWeight: Typography.weights.bold,
    letterSpacing: -1,
  },
  detailCard: {
    width: "100%",
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  detailValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.primary.red,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  primaryButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
});

