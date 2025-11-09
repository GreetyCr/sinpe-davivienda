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
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
};

export const RechargeConfirmModal = ({
  visible,
  provider,
  phoneNumber,
  amount,
  onConfirm,
  onCancel,
  isProcessing,
}: Props) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Icon name="bolt" size={28} color={Colors.primary.red} />
          </View>
          <Text style={styles.title}>Confirmar recarga</Text>
          <Text style={styles.subtitle}>Revisa los datos antes de continuar</Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Monto a recargar</Text>
            <Text style={styles.amount}>{formatCurrency(amount)}</Text>
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Icon name="signal-cellular-alt" size={20} color={Colors.text.secondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Operadora</Text>
                <Text style={styles.detailValue}>{provider}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="phone-android" size={20} color={Colors.text.secondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Número</Text>
                <Text style={styles.detailValue}>+506 {phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Icon name="info" size={18} color={Colors.status.info} />
          <Text style={styles.infoText}>Las recargas son inmediatas y no se pueden revertir.</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, styles.secondary]}
            onPress={onCancel}
            disabled={isProcessing}
          >
            <Text style={styles.secondaryText}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.primary, isProcessing && styles.disabled]}
            onPress={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Text style={styles.primaryText}>Procesando...</Text>
            ) : (
              <>
                <Text style={styles.primaryText}>Confirmar recarga</Text>
              </>
            )}
          </Pressable>
        </View>
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
    maxWidth: 420,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  summary: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  amountSection: {
    alignItems: "center",
  },
  amountLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  amount: {
    fontSize: Typography.sizes["4xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.primary.red,
    letterSpacing: -1,
  },
  details: {
    gap: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailContent: {
    marginLeft: Spacing.md,
  },
  detailLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${Colors.status.info}10`,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.status.info,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  secondary: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  primary: {
    backgroundColor: Colors.primary.red,
  },
  disabled: {
    opacity: 0.6,
  },
  secondaryText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.secondary,
  },
  primaryText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
});

