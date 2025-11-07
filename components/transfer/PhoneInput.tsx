import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidation?: (isValid: boolean) => void;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  onValidation,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remover todo lo que no sea número
    const cleaned = text.replace(/\D/g, '');
    
    // Limitar a 8 dígitos
    const limited = cleaned.slice(0, 8);
    
    // Formatear: 8888-7777
    if (limited.length > 4) {
      return `${limited.slice(0, 4)}-${limited.slice(4)}`;
    }
    return limited;
  };

  const handleChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    onChangeText(formatted);
    
    // Validar: debe tener 9 caracteres (8 dígitos + 1 guión)
    const isValid = formatted.replace(/\D/g, '').length === 8;
    onValidation?.(isValid);
  };

  const isValid = value.replace(/\D/g, '').length === 8;
  const showValidIcon = !isFocused && value.length > 0 && isValid;
  const showErrorIcon = !isFocused && value.length > 0 && !isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de teléfono</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          isValid && !isFocused && styles.inputContainerValid,
        ]}
      >
        <View style={styles.prefixContainer}>
          <Icon name="phone" size={20} color={Colors.text.secondary} />
          <Text style={styles.prefix}>+506</Text>
        </View>
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="8888-7777"
          placeholderTextColor={Colors.text.light}
          keyboardType="phone-pad"
          maxLength={9}
          autoComplete="tel"
        />

        {showValidIcon && (
          <Icon name="check-circle" size={24} color={Colors.status.success} />
        )}
        {showErrorIcon && (
          <Icon name="error" size={24} color={Colors.status.error} />
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!error && value.length > 0 && !isValid && (
        <Text style={styles.helperText}>Ingresa 8 dígitos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
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
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: Colors.primary.red,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: Colors.status.error,
  },
  inputContainerValid: {
    borderColor: Colors.status.success,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.sm,
    paddingRight: Spacing.sm,
    borderRightWidth: 1,
    borderRightColor: Colors.ui.border,
  },
  prefix: {
    fontSize: Typography.sizes.base,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.medium,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 1,
  },
  errorText: {
    fontSize: Typography.sizes.sm,
    color: Colors.status.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  helperText: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});

