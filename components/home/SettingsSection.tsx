import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Switch, Pressable, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface SettingsSectionProps {
  email: string;
  notificationsEnabled: boolean;
  onEmailChange: (email: string) => void;
  onNotificationsToggle: (enabled: boolean) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  email: initialEmail,
  notificationsEnabled,
  onEmailChange,
  onNotificationsToggle,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleSaveEmail = () => {
    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }
    onEmailChange(email);
    setIsEditingEmail(false);
    Alert.alert('Éxito', 'Correo electrónico actualizado correctamente');
  };

  const handleCancelEmail = () => {
    setEmail(initialEmail);
    setIsEditingEmail(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="cog" size={24} color={Colors.primary.red} />
        <Text style={styles.title}>Ajustes</Text>
      </View>

      {/* Correo Electrónico - Editable */}
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Icon name="email" size={20} color={Colors.primary.red} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          
          {isEditingEmail ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={Colors.text.light}
              />
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.cancelButton}
                  onPress={handleCancelEmail}
                >
                  <Icon name="close" size={18} color={Colors.text.secondary} />
                </Pressable>
                <Pressable 
                  style={styles.saveButton}
                  onPress={handleSaveEmail}
                >
                  <Icon name="check" size={18} color={Colors.complementary.white} />
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{email}</Text>
              <Pressable 
                style={styles.editButton}
                onPress={() => setIsEditingEmail(true)}
              >
                <Icon name="pencil" size={18} color={Colors.primary.red} />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Notificaciones - Switch */}
      <View style={styles.settingRow}>
        <View style={styles.iconContainer}>
          <Icon 
            name={notificationsEnabled ? "bell" : "bell-off"} 
            size={20} 
            color={Colors.primary.red} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Notificaciones</Text>
          <Text style={styles.description}>
            {notificationsEnabled 
              ? 'Recibirás alertas de transacciones' 
              : 'No recibirás notificaciones'}
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={onNotificationsToggle}
          trackColor={{ 
            false: Colors.background.tertiary, 
            true: `${Colors.status.success}50` 
          }}
          thumbColor={notificationsEnabled ? Colors.status.success : Colors.ui.border}
          ios_backgroundColor={Colors.background.tertiary}
        />
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
  settingRow: {
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
  contentContainer: {
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
  description: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.light,
    marginTop: 2,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  editButton: {
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary.red}10`,
  },
  editContainer: {
    marginTop: 4,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.status.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.border,
    marginVertical: Spacing.md,
  },
});

