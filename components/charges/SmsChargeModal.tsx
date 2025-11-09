import React, { useMemo } from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { formatCurrency } from "@/utils/mockData";

type Props = {
  visible: boolean;
  amount: number;
  contactName?: string;
  phoneNumber: string;
  senderName: string;
  description?: string;
  reference: string;
  onSend: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
};

export const SmsChargeModal = ({
  visible,
  amount,
  contactName,
  phoneNumber,
  senderName,
  description,
  reference,
  onSend,
  onCancel,
  isProcessing,
}: Props) => {
  const previewMessage = useMemo(
    () =>
      [
        `Hola ${contactName || "cliente"},`,
        `${senderName} te envió un cobro SINPE por ${formatCurrency(amount)}.`,
        `Referencia: ${reference}.`,
        description && `Detalle: ${description}.`,
        "Usa el enlace del SMS para completarlo.",
      ]
        .filter(Boolean)
        .join(" "),
    [amount, contactName, description, reference, senderName]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Icon name="sms" size={28} color={Colors.primary.red} />
            </View>
            <Text style={styles.title}>Enviar cobro por SMS</Text>
            <Text style={styles.subtitle}>
              Verifica los datos antes de compartirlo
            </Text>
          </View>

          <View style={styles.summary}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Monto del cobro</Text>
              <Text style={styles.amount}>{formatCurrency(amount)}</Text>
            </View>

            <View style={styles.details}>
              {contactName && (
                <View style={styles.detailRow}>
                  <Icon name="person" size={20} color={Colors.text.secondary} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Contacto</Text>
                    <Text style={styles.detailValue}>{contactName}</Text>
                  </View>
                </View>
              )}

              <View style={styles.detailRow}>
                <Icon name="phone-android" size={20} color={Colors.text.secondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Teléfono</Text>
                  <Text style={styles.detailValue}>+506 {phoneNumber}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Icon name="tag" size={20} color={Colors.text.secondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Referencia</Text>
                  <Text style={styles.detailValue}>{reference}</Text>
                </View>
              </View>

              {description ? (
                <View style={styles.detailRow}>
                  <Icon name="description" size={20} color={Colors.text.secondary} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Descripción</Text>
                    <Text style={styles.detailValue}>{description}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.previewBox}>
            <Icon name="chat" size={18} color={Colors.primary.orange} />
            <View style={styles.previewContent}>
              <Text style={styles.previewLabel}>Mensaje a enviar</Text>
              <Text style={styles.previewText}>{previewMessage}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Icon name="info" size={18} color={Colors.status.info} />
            <Text style={styles.infoText}>
              El destinatario recibirá un SMS con un enlace seguro para pagar.
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={onCancel}
              disabled={isProcessing}
            >
              <Text style={styles.secondaryText}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.primaryButton,
                isProcessing && styles.disabledButton,
              ]}
              onPress={onSend}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Text style={styles.primaryText}>Enviando...</Text>
              ) : (
                <>
                  <Icon
                    name="send"
                    size={18}
                    color={Colors.complementary.white}
                  />
                  <Text style={styles.primaryText}>Enviar SMS</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    gap: Spacing.sm,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
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
    flex: 1,
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
  previewBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
  },
  previewContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  previewLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    textTransform: "uppercase",
  },
  previewText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${Colors.status.info}12`,
    margin: Spacing.lg,
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.text.light,
  },
  secondaryText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  primaryButton: {
    backgroundColor: Colors.primary.red,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
