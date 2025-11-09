import React, { useState } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { mockUser, mockContacts } from "@/utils/mockData";
import { AmountInput } from "@/components/transfer";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Contact } from "@/types";

import {
  ProviderSelector,
  type ChargeProvider,
  PROVIDERS,
} from "@/components/services/ProviderSelector";
import { ContactSection } from "@/components/services/ContactSection";
import { ActionButtons } from "@/components/charges/ActionButtons";
import { RechargeConfirmModal } from "@/components/services/RechargeConfirmModal";
import { RechargeSuccessModal } from "@/components/services/RechargeSuccessModal";

const PROVIDER_LABEL_MAP: Record<ChargeProvider, string> = PROVIDERS.reduce(
  (acc, provider) => {
    acc[provider.id] = provider.label;
    return acc;
  },
  {} as Record<ChargeProvider, string>
);

export default function TransferScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [method, setMethod] = useState<ChargeProvider>("liberty");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reference, setReference] = useState("");
  const [lastRecharge, setLastRecharge] = useState<{
    phoneNumber: string;
    amount: number;
    provider: ChargeProvider;
  } | null>(null);

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

  const handleSelectFromNativeContacts = (
    phoneNumber: string,
    name?: string
  ) => {
    setPhoneNumber(phoneNumber);
    setIsPhoneValid(true);
    // Crear contacto temporal si viene nombre
    if (name) {
      setSelectedContact({
        id: "temp-" + Date.now(),
        name: name,
        phoneNumber: phoneNumber,
        isFavorite: false,
      });
    } else {
      setSelectedContact(null);
    }
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    if (selectedContact && text !== selectedContact.phoneNumber) {
      setSelectedContact(null);
    }
  };

  const resetForm = () => {
    setPhoneNumber("");
    setAmount("");
    setSelectedContact(null);
    setIsPhoneValid(false);
  };

  const generateReference = () => {
    const now = new Date();
    return `REC-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${Math.floor(
      Math.random() * 1000
    )
      .toString()
      .padStart(3, "0")}`;
  };

  const handleConfirmRecharge = () => {
    const currentAmount = parseInt(amount) || 0;
    const currentPhone = phoneNumber;
    const currentProvider = method;

    setIsProcessing(true);

    setTimeout(() => {
      const newReference = generateReference();
      setIsProcessing(false);
      setShowConfirm(false);
      setReference(newReference);
      setLastRecharge({
        phoneNumber: currentPhone,
        amount: currentAmount,
        provider: currentProvider,
      });
      setShowSuccess(true);
      resetForm();
    }, 1200);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setLastRecharge(null);
  };

  const handleRemoveFavorite = (contactId: string) => {
    // Aquí se implementaría la lógica real de eliminar del backend
    // Por ahora solo mostramos un mensaje
    console.log("Eliminar favorito:", contactId);
    // TODO: Implementar lógica de eliminación cuando haya backend
  };

  const handleAddFavorite = () => {
    // Aquí se abriría un modal o pantalla para agregar un nuevo favorito
    console.log("Agregar nuevo favorito");
    // TODO: Implementar modal de agregar favorito
  };

  const numericAmount = parseInt(amount) || 0;
  const canContinue =
    isPhoneValid && numericAmount > 0 && numericAmount <= mockUser.balance;
  const handleContinue = () => {
    if (!canContinue) return;
    setShowConfirm(true);
  };

  const providerLabel = PROVIDER_LABEL_MAP[method];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <ProviderSelector method={method} onChange={setMethod} />

        <ContactSection
          contacts={favoriteContacts}
          selectedContact={selectedContact}
          phoneNumber={phoneNumber}
          onSelectContact={handleSelectContact}
          onSelectFromNative={handleSelectFromNativeContacts}
          onRemoveFavorite={handleRemoveFavorite}
          onAddFavorite={handleAddFavorite}
          onPhoneChange={handlePhoneChange}
          onValidation={setIsPhoneValid}
        />

        {/* Input de monto */}
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          maxAmount={mockUser.balance}
        />


        <ActionButtons
          primaryLabel={`Realizar Recarga`}
          onCancel={resetForm}
          onContinue={handleContinue}
        />
      </ScrollView>
      <RechargeConfirmModal
        visible={showConfirm}
        provider={providerLabel}
        phoneNumber={phoneNumber}
        amount={numericAmount}
        onCancel={() => {
          setIsProcessing(false);
          setShowConfirm(false);
        }}
        onConfirm={handleConfirmRecharge}
        isProcessing={isProcessing}
      />

      {lastRecharge && (
        <RechargeSuccessModal
          visible={showSuccess}
          provider={PROVIDER_LABEL_MAP[lastRecharge.provider]}
          phoneNumber={lastRecharge.phoneNumber}
          amount={lastRecharge.amount}
          reference={reference}
          onClose={handleCloseSuccess}
        />
      )}
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
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing["2xl"],
  },
});
