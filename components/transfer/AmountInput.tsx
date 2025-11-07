import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency } from '@/utils/mockData';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  maxAmount?: number;
  error?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeText,
  maxAmount,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatAmount = (text: string) => {
    // Solo números
    const cleaned = text.replace(/\D/g, '');
    return cleaned;
  };

  const handleChange = (text: string) => {
    const formatted = formatAmount(text);
    onChangeText(formatted);
  };

  const numericValue = parseInt(value) || 0;
  const isValid = numericValue > 0 && (!maxAmount || numericValue <= maxAmount);
  const exceedsMax = maxAmount && numericValue > maxAmount;

  // Montos rápidos sugeridos
  const quickAmounts = [1000, 2000, 5000, 10000];

  const handleQuickAmount = (amount: number) => {
    onChangeText(amount.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Monto a enviar</Text>
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          isValid && !isFocused && styles.inputContainerValid,
        ]}
      >
        <Text style={styles.currency}>₡</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="0"
          placeholderTextColor={Colors.text.light}
          keyboardType="numeric"
          maxLength={10}
        />
        {isValid && !isFocused && (
          <Icon name="check-circle" size={28} color={Colors.status.success} />
        )}
      </View>

      {numericValue > 0 && (
        <Text style={styles.formattedAmount}>
          {formatCurrency(numericValue)}
        </Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
      {exceedsMax && !error && (
        <Text style={styles.errorText}>
          Saldo insuficiente. Disponible: {formatCurrency(maxAmount)}
        </Text>
      )}

      {/* Montos rápidos */}
      <View style={styles.quickAmountsContainer}>
        <View style={styles.quickAmounts}>
          {quickAmounts.map((amount) => (
            <View key={amount} style={styles.quickAmountWrapper}>
              <Text
                style={styles.quickAmount}
                onPress={() => handleQuickAmount(amount)}
              >
                {formatCurrency(amount).replace('₡', '₡ ')}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 80,
  },
  inputContainerFocused: {
    borderColor: Colors.primary.red,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainerError: {
    borderColor: Colors.status.error,
  },
  inputContainerValid: {
    borderColor: Colors.status.success,
  },
  currency: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.secondary,
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes['4xl'],
    color: Colors.text.primary,
    fontWeight: Typography.weights.bold,
    letterSpacing: -1,
  },
  formattedAmount: {
    fontSize: Typography.sizes.base,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
    marginLeft: Spacing.xs,
    fontWeight: Typography.weights.medium,
  },
  errorText: {
    fontSize: Typography.sizes.sm,
    color: Colors.status.error,
    marginTop: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  quickAmountsContainer: {
    marginTop: Spacing.xs,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickAmountWrapper: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  quickAmount: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Colors.primary.red,
    fontWeight: Typography.weights.semibold,
  },
});

