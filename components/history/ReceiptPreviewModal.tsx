import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Transaction, User } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency, formatDate } from '@/utils/mockData';

interface ReceiptPreviewModalProps {
  visible: boolean;
  transaction: Transaction | null;
  user: User;
  onClose: () => void;
  onDownload: () => void;
}

export const ReceiptPreviewModal: React.FC<ReceiptPreviewModalProps> = ({
  visible,
  transaction,
  user,
  onClose,
  onDownload,
}) => {
  if (!transaction) {
    return null;
  }

  const isCredit = transaction.type === 'receive';
  const accentColor = Colors.primary.red;
  const amountColor = isCredit ? Colors.status.success : Colors.status.error;
  const noteTitle = isCredit ? 'NOTA DE CRÉDITO' : 'NOTA DE DÉBITO';
  const amountLabel = isCredit ? 'Crédito' : 'Débito';

  const counterpartyName = isCredit
    ? transaction.sender?.name ?? 'Cuenta externa'
    : transaction.recipient?.name ?? 'Cuenta externa';
  const counterpartyPhone = isCredit
    ? transaction.sender?.phoneNumber ?? ''
    : transaction.recipient?.phoneNumber ?? '';

  const updatedAt = new Date().toLocaleString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const details = [
    {
      label: amountLabel,
      value: `${isCredit ? '+' : '-'}${formatCurrency(transaction.amount)}`,
      valueStyle: [styles.amountValue, { color: amountColor }],
    },
    {
      label: isCredit ? 'Origen' : 'Destino',
      value: [counterpartyName, counterpartyPhone].filter(Boolean).join('\n'),
    },
    {
      label: isCredit ? 'Destino' : 'Origen',
      value: `${user.name}\n${user.accountNumber}`,
    },
    {
      label: 'Descripción',
      value: transaction.description || 'Sin descripción',
    },
    {
      label: 'Referencia SINPE',
      value: transaction.reference || 'No disponible',
    },
    {
      label: 'Fecha de transacción',
      value: formatDate(transaction.date),
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Detalle transacción cuentas</Text>
          <Text style={styles.timestamp}>Actualizado al {updatedAt}</Text>

          <View style={[styles.receiptCard, { borderTopColor: accentColor }]}>
            <View style={[styles.noteHeader, { borderBottomColor: accentColor }]}>
              <View style={[styles.noteIcon, { backgroundColor: `${accentColor}20` }]}>
                <Icon
                  name={isCredit ? 'arrow-downward' : 'arrow-upward'}
                  size={20}
                  color={accentColor}
                />
              </View>
              <Text style={styles.noteTitle}>{noteTitle}</Text>
            </View>

            {details.map((detail) => (
              <View style={styles.detailRow} key={detail.label}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={[styles.detailValue, detail.valueStyle]}>
                  {detail.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.secondaryButton]} onPress={onClose}>
              <Text style={styles.secondaryText}>Volver</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.primaryButton]} onPress={onDownload}>
              <Icon name="file-download" size={18} color={Colors.complementary.white} />
              <Text style={styles.primaryText}>Descargar</Text>
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
    maxWidth: 420,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  timestamp: {
    marginTop: Spacing.xs,
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  receiptCard: {
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderTopWidth: 4,
    backgroundColor: Colors.complementary.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.md,
    borderBottomWidth: 2,
  },
  noteIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  noteTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    textTransform: 'uppercase',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    gap: Spacing.lg,
  },
  detailLabel: {
    width: '35%',
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.medium,
  },
  detailValue: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  amountValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  secondaryButton: {
    backgroundColor: Colors.background.secondary,
  },
  secondaryText: {
    color: Colors.text.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  primaryButton: {
    backgroundColor: Colors.primary.red,
  },
  primaryText: {
    color: Colors.complementary.white,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
