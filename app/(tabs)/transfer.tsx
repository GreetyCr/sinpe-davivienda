import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockUser, mockContacts } from '@/utils/mockData';
import {
  PhoneInput,
  AmountInput,
  ContactSelector,
  TransferSummary,
  SuccessModal,
} from '@/components/transfer';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { Contact } from '@/types';

export default function TransferScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filtrar contactos favoritos para mostrar primero
  const favoriteContacts = mockContacts
    .filter((c) => c.isFavorite)
    .sort((a, b) => {
      if (!a.lastTransaction && !b.lastTransaction) return 0;
      if (!a.lastTransaction) return 1;
      if (!b.lastTransaction) return -1;
      return b.lastTransaction.getTime() - a.lastTransaction.getTime();
    });

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setPhoneNumber(contact.phoneNumber);
    setIsPhoneValid(true);
  };

  const handleSelectFromNativeContacts = (phoneNumber: string, name?: string) => {
    setPhoneNumber(phoneNumber);
    setIsPhoneValid(true);
    // Crear contacto temporal si viene nombre
    if (name) {
      setSelectedContact({
        id: 'temp-' + Date.now(),
        name: name,
        phoneNumber: phoneNumber,
        isFavorite: false,
      });
    } else {
      setSelectedContact(null);
    }
  };

  const handleContinue = () => {
    const numericAmount = parseInt(amount);
    if (isPhoneValid && numericAmount > 0 && numericAmount <= mockUser.balance) {
      setShowSummary(true);
    }
  };

  const handleConfirmTransfer = () => {
    setIsProcessing(true);
    
    // Simular proceso de transferencia
    setTimeout(() => {
      setIsProcessing(false);
      setShowSummary(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Resetear formulario
    setPhoneNumber('');
    setAmount('');
    setDescription('');
    setSelectedContact(null);
    setIsPhoneValid(false);
  };

  const handleRemoveFavorite = (contactId: string) => {
    // Aquí se implementaría la lógica real de eliminar del backend
    // Por ahora solo mostramos un mensaje
    console.log('Eliminar favorito:', contactId);
    // TODO: Implementar lógica de eliminación cuando haya backend
  };

  const handleAddFavorite = () => {
    // Aquí se abriría un modal o pantalla para agregar un nuevo favorito
    console.log('Agregar nuevo favorito');
    // TODO: Implementar modal de agregar favorito
  };

  const handleViewHistory = () => {
    setShowSuccess(false);
    router.push('/history' as any);
  };

  const numericAmount = parseInt(amount) || 0;
  const canContinue = isPhoneValid && numericAmount > 0 && numericAmount <= mockUser.balance;
  const reference = `SINPE-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Saludo y saldo disponible */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Enviar dinero</Text>
          <View style={styles.balanceChip}>
            <Icon name="account-balance-wallet" size={16} color={Colors.status.info} />
            <Text style={styles.balanceText}>
              Disponible: ₡{mockUser.balance.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Selector unificado de contactos */}
        <ContactSelector
          contacts={favoriteContacts}
          onSelectContact={handleSelectContact}
          onSelectFromNative={handleSelectFromNativeContacts}
          onRemoveFavorite={handleRemoveFavorite}
          onAddFavorite={handleAddFavorite}
          selectedPhone={phoneNumber}
        />

        {/* Input de teléfono */}
        <PhoneInput
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            // Limpiar selección de contacto si cambia manualmente
            if (selectedContact && text !== selectedContact.phoneNumber) {
              setSelectedContact(null);
            }
          }}
          onValidation={setIsPhoneValid}
        />

        {/* Input de monto */}
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          maxAmount={mockUser.balance}
        />

        {/* Descripción opcional */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Descripción (opcional)</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="¿Para qué es este pago?"
            placeholderTextColor={Colors.text.light}
            maxLength={50}
            multiline
          />
        </View>

        {/* Botón continuar */}
        <Pressable
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
          <Icon name="arrow-forward" size={20} color={Colors.complementary.white} />
        </Pressable>

        {/* Info de seguridad */}
        <View style={styles.securityInfo}>
          <Icon name="lock" size={16} color={Colors.status.success} />
          <Text style={styles.securityText}>
            Tus transferencias están protegidas y son instantáneas
          </Text>
        </View>
      </ScrollView>

      {/* Modal de confirmación */}
      <TransferSummary
        visible={showSummary}
        recipientName={selectedContact?.name}
        recipientPhone={phoneNumber}
        amount={numericAmount}
        description={description}
        onConfirm={handleConfirmTransfer}
        onCancel={() => setShowSummary(false)}
        isProcessing={isProcessing}
      />

      {/* Modal de éxito */}
      <SuccessModal
        visible={showSuccess}
        recipientName={selectedContact?.name}
        amount={numericAmount}
        reference={reference}
        onClose={handleCloseSuccess}
        onViewHistory={handleViewHistory}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  header: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  balanceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.status.info}15`,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  balanceText: {
    fontSize: Typography.sizes.sm,
    color: Colors.status.info,
    fontWeight: Typography.weights.semibold,
  },
  descriptionContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  descriptionInput: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.red,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.text.light,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.sm,
  },
  securityText: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
  },
});
