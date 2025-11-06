import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency } from '@/utils/mockData';

interface SuccessModalProps {
  visible: boolean;
  recipientName?: string;
  amount: number;
  reference: string;
  onClose: () => void;
  onViewHistory?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  recipientName,
  amount,
  reference,
  onClose,
  onViewHistory,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animación del check
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Fade in del contenido
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Check animado */}
          <Animated.View
            style={[
              styles.checkCircle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Icon name="check" size={64} color={Colors.complementary.white} />
          </Animated.View>

          {/* Contenido */}
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <Text style={styles.title}>¡Transferencia exitosa!</Text>
            
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Enviaste</Text>
              <Text style={styles.amount}>{formatCurrency(amount)}</Text>
              {recipientName && (
                <Text style={styles.recipient}>a {recipientName}</Text>
              )}
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Referencia:</Text>
                <Text style={styles.infoValue}>{reference}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fecha:</Text>
                <Text style={styles.infoValue}>
                  {new Date().toLocaleDateString('es-CR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>

            {/* Mensaje motivacional */}
            <View style={styles.messageBox}>
              <Icon name="celebration" size={20} color={Colors.primary.orange} />
              <Text style={styles.messageText}>
                Tu dinero llegó al instante 🚀
              </Text>
            </View>
          </Animated.View>

          {/* Botones */}
          <View style={styles.actions}>
            {onViewHistory && (
              <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={onViewHistory}
              >
                <Icon name="history" size={20} color={Colors.primary.red} />
                <Text style={styles.secondaryButtonText}>Ver historial</Text>
              </Pressable>
            )}

            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={onClose}
            >
              <Text style={styles.primaryButtonText}>Nueva transferencia</Text>
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
    alignItems: 'center',
    padding: Spacing.xl,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.status.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.status.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.xs,
  },
  recipient: {
    fontSize: Typography.sizes.base,
    color: Colors.text.secondary,
  },
  infoBox: {
    width: '100%',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  infoValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary.orange}15`,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  messageText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  actions: {
    width: '100%',
    gap: Spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  primaryButton: {
    backgroundColor: Colors.primary.red,
  },
  primaryButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
  secondaryButton: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  secondaryButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary.red,
  },
});

