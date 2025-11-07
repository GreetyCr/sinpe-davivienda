import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { mockUser, mockContacts } from "@/utils/mockData";
import {
  PhoneInput,
  AmountInput,
  ContactSelector,
  TransferSummary,
  SuccessModal,
} from "@/components/transfer";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { Contact } from "@/types";
import { ChargesHeader } from "@/components/charges/ChargesHeader";
import { MethodSelector } from "@/components/charges/MethodSelector";
import { DescriptionField } from "@/components/charges/DescriptionField";
import { ActionButtons } from "@/components/charges/ActionButtons";

export default function TransferScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<"qr" | "sms">("qr");

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

  const handleContinue = () => {
    const numericAmount = parseInt(amount);
    if (
      isPhoneValid &&
      numericAmount > 0 &&
      numericAmount <= mockUser.balance
    ) {
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
    setPhoneNumber("");
    setAmount("");
    setDescription("");
    setSelectedContact(null);
    setIsPhoneValid(false);
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

  const handleViewHistory = () => {
    setShowSuccess(false);
    router.push("/history" as any);
  };

  const numericAmount = parseInt(amount) || 0;
  const canContinue =
    isPhoneValid && numericAmount > 0 && numericAmount <= mockUser.balance;
  const reference = `SINPE-${new Date().getFullYear()}${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${new Date()
    .getDate()
    .toString()
    .padStart(2, "0")}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

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
        <MethodSelector method={method} onChange={setMethod} />

        {method === "sms" && (
          <>
            <ContactSelector
              contacts={favoriteContacts}
              onSelectContact={handleSelectContact}
              onSelectFromNative={handleSelectFromNativeContacts}
              onRemoveFavorite={handleRemoveFavorite}
              onAddFavorite={handleAddFavorite}
              selectedPhone={phoneNumber}
            />

            <PhoneInput
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (selectedContact && text !== selectedContact.phoneNumber) {
                  setSelectedContact(null);
                }
              }}
              onValidation={setIsPhoneValid}
            />
          </>
        )}

        {/* Input de monto */}
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          maxAmount={mockUser.balance}
        />

        <DescriptionField value={description} onChangeText={setDescription} />

        <ActionButtons
          method={method}
          onCancel={handleCloseSuccess}
          onContinue={handleContinue}
        />
      </ScrollView>
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
    paddingBottom: Spacing["3xl"],
  },
  header: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sizes["2xl"],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  balanceChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
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
});
