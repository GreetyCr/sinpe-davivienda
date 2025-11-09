import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Share,
} from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { mockUser, mockContacts } from "@/utils/mockData";
import {
  PhoneInput,
  AmountInput,
  ContactSelector,
} from "@/components/transfer";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { Contact } from "@/types";
import { MethodSelector } from "@/components/charges/MethodSelector";
import { DescriptionField } from "@/components/charges/DescriptionField";
import { ActionButtons } from "@/components/charges/ActionButtons";
import { QrPreviewModal } from "@/components/charges/QrPreviewModal";
import { SmsChargeModal } from "@/components/charges/SmsChargeModal";

const generateChargeReference = () =>
  `SINPE-${new Date().getFullYear()}${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0")}${new Date()
    .getDate()
    .toString()
    .padStart(2, "0")}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

export default function TransferScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<"qr" | "sms">("qr");
  const [showQrModal, setShowQrModal] = useState(false);
  const [chargeReference, setChargeReference] = useState(() => generateChargeReference());

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
    const isAmountValid = numericAmount > 0 && numericAmount <= mockUser.balance;

    if (method === "qr") {
      if (!isAmountValid) {
        return;
      }
      setChargeReference(generateChargeReference());
      setShowQrModal(true);
      return;
    }

    if (isPhoneValid && isAmountValid) {
      setChargeReference(generateChargeReference());
      setShowSmsModal(true);
    }
  };

  const handleSendSmsCharge = () => {
    setIsProcessing(true);

    // Simular proceso de transferencia
    setTimeout(() => {
      setIsProcessing(false);
      setShowSmsModal(false);
      handleCloseSuccess();
    }, 2000);
  };

  const handleCloseSuccess = () => {
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

  const numericAmount = parseInt(amount) || 0;
  const formattedAmount = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
  }).format(numericAmount);

  const handleCloseQrModal = () => {
    handleCloseSuccess();
    setShowQrModal(false);
  };

  const handleShareQr = async () => {
    const shareMessage = [
      "Cobro SINPE disponible",
      `Referencia: ${chargeReference}`,
      `Monto: ${formattedAmount}`,
      description && `Descripción: ${description}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      console.log("Error al compartir QR:", error);
    }
  };

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

        <View
          style={[
            styles.formSection,
            method === "qr" && styles.qrFormSection,
          ]}
        >
          {method === "qr" && (
            <View style={styles.qrInfoCard}>
              <View style={styles.qrInfoIcon}>
                <Icon name="qr-code-2" size={28} color={Colors.primary.red} />
              </View>
              <View style={styles.qrInfoContent}>
                <Text style={styles.qrInfoTitle}>Comparte tu QR al instante</Text>
                <Text style={styles.qrInfoDescription}>
                  Genera un código para que tus clientes lo escaneen sin digitar números.
                  Asegúrate de mostrarlo en la pantalla o compártelo desde el botón de compartir.
                </Text>
              </View>
            </View>
          )}

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
                  if (
                    selectedContact &&
                    text !== selectedContact.phoneNumber
                  ) {
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

          <DescriptionField
            value={description}
            onChangeText={setDescription}
          />

          <ActionButtons
            primaryLabel={method === "qr" ? "Generar QR" : "Enviar cobro"}
            primaryIcon={method === "qr" ? "qr-code-2" : "arrow-forward"}
            onCancel={handleCloseSuccess}
            onContinue={handleContinue}
          />
        </View>
      </ScrollView>

      <QrPreviewModal
        visible={showQrModal}
        amount={formattedAmount}
        description={description}
        reference={chargeReference}
        onClose={handleCloseQrModal}
        onShare={handleShareQr}
      />

      <SmsChargeModal
        visible={showSmsModal}
        amount={numericAmount}
        contactName={selectedContact?.name}
        phoneNumber={phoneNumber}
        senderName={mockUser.name}
        description={description}
        reference={chargeReference}
        onCancel={() => setShowSmsModal(false)}
        onSend={handleSendSmsCharge}
        isProcessing={isProcessing}
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
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing["3xl"],
  },
  formSection: {
    width: "100%",
  },
  qrFormSection: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  qrInfoCard: {
    flexDirection: "row",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing["2xl"],
    backgroundColor: Colors.complementary.white,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  qrInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  qrInfoContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  qrInfoTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  qrInfoDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
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
