import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { mockUser, mockTransactions } from '@/utils/mockData';
import { BalanceCard, AccountInfo, SettingsSection, RecentTransactions } from '@/components/home';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEmailChange = (newEmail: string) => {
    console.log('Nuevo correo:', newEmail);
    // TODO: Implementar actualización de email en el backend
  };

  const handleNotificationsToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    Alert.alert(
      'Notificaciones',
      enabled 
        ? 'Las notificaciones han sido activadas' 
        : 'Las notificaciones han sido desactivadas',
      [{ text: 'Entendido' }]
    );
    // TODO: Implementar actualización de preferencias en el backend
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary.red}
          colors={[Colors.primary.red]}
        />
      }
    >
      {/* Saludo personalizado */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>¡Hola, {mockUser.name.split(' ')[0]}! 👋</Text>
        <Text style={styles.subgreeting}>Bienvenido a tu SINPE</Text>
      </View>

      {/* Card de saldo con gradiente */}
      <BalanceCard balance={mockUser.balance} accountNumber={mockUser.accountNumber} />

      {/* Información de la cuenta */}
      <AccountInfo 
        accountNumber={mockUser.accountNumber}
        name={mockUser.name}
        phoneNumber={mockUser.phoneNumber}
      />

      {/* Ajustes */}
      <SettingsSection
        email={mockUser.email}
        notificationsEnabled={notificationsEnabled}
        onEmailChange={handleEmailChange}
        onNotificationsToggle={handleNotificationsToggle}
      />

      {/* Últimas transacciones - scroll horizontal */}
      <RecentTransactions transactions={mockTransactions} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  greetingSection: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subgreeting: {
    fontSize: Typography.sizes.base,
    color: Colors.text.secondary,
  },
});

