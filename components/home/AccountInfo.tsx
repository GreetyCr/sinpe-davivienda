import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface AccountInfoProps {
  accountNumber: string;
  name: string;
  phoneNumber: string;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({
  accountNumber,
  name,
  phoneNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={24} color={Colors.primary.red} />
        <Text style={styles.title}>Información de la Cuenta</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Icon name="card-account-details" size={20} color={Colors.primary.red} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Número de Cuenta</Text>
          <Text style={styles.value}>{accountNumber}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Icon name="account" size={20} color={Colors.primary.red} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Nombre Completo</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Icon name="phone" size={20} color={Colors.primary.red} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Número de Teléfono</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary.red}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  value: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.border,
    marginVertical: Spacing.xs,
  },
});

