import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency } from '@/utils/mockData';

interface TransferSummaryProps {
  visible: boolean;
  recipientName?: string;
  recipientPhone: string;
  amount: number;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export const TransferSummary: React.FC<TransferSummaryProps> = ({
  visible,
  recipientName,
  recipientPhone,
  amount,
  description,
  onConfirm,
  onCancel,
  isProcessing,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Icon name="send" size={32} color={Colors.primary.red} />
            </View>
            <Text style={styles.title}>Confirmar transferencia</Text>
            <Text style={styles.subtitle}>Verifica los datos antes de enviar</Text>
          </View>

          {/* Resumen */}
          <View style={styles.summary}>
            {/* Monto destacado */}
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Vas a enviar</Text>
              <Text style={styles.amount}>{formatCurrency(amount)}</Text>
            </View>

            {/* Detalles */}
            <View style={styles.details}>
              <View style={styles.detailRow}>
                <Icon name="person" size={20} color={Colors.text.secondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Para</Text>
                  <Text style={styles.detailValue}>
                    {recipientName || 'Destinatario'}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Icon name="phone" size={20} color={Colors.text.secondary} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Teléfono</Text>
                  <Text style={styles.detailValue}>+506 {recipientPhone}</Text>
                </View>
              </View>

              {description && (
                <View style={styles.detailRow}>
                  <Icon name="description" size={20} color={Colors.text.secondary} />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Descripción</Text>
                    <Text style={styles.detailValue}>{description}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Info importante */}
          <View style={styles.infoBox}>
            <Icon name="info" size={16} color={Colors.status.info} />
            <Text style={styles.infoText}>
              Esta operación es inmediata y no se puede revertir
            </Text>
          </View>

          {/* Botones */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isProcessing}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.confirmButton, isProcessing && styles.buttonDisabled]}
              onPress={onConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Text style={styles.confirmButtonText}>Enviando...</Text>
              ) : (
                <>
                  <Icon name="check" size={20} color={Colors.complementary.white} />
                  <Text style={styles.confirmButtonText}>Confirmar envío</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  summary: {
    padding: Spacing.lg,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
    marginBottom: Spacing.md,
  },
  amountLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  amount: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary.red,
    letterSpacing: -1,
  },
  details: {
    gap: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.status.info}10`,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.status.info,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingTop: 0,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  cancelButton: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  cancelButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.secondary,
  },
  confirmButton: {
    backgroundColor: Colors.primary.red,
  },
  confirmButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

