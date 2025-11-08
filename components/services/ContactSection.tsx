import React from "react";
import { View } from "react-native";
import { ContactSelector, PhoneInput } from "@/components/transfer";
import { Contact } from "@/types";

export type ContactSectionProps = {
  contacts: Contact[];
  selectedContact: Contact | null;
  phoneNumber: string;
  onSelectContact: (contact: Contact) => void;
  onSelectFromNative: (phone: string, name?: string) => void;
  onRemoveFavorite: (contactId: string) => void;
  onAddFavorite: () => void;
  onPhoneChange: (value: string) => void;
  onValidation: (isValid: boolean) => void;
};

export const ContactSection = ({
  contacts,
  selectedContact,
  phoneNumber,
  onSelectContact,
  onSelectFromNative,
  onRemoveFavorite,
  onAddFavorite,
  onPhoneChange,
  onValidation,
}: ContactSectionProps) => (
  <View>
    <ContactSelector
      contacts={contacts}
      onSelectContact={onSelectContact}
      onSelectFromNative={onSelectFromNative}
      onRemoveFavorite={onRemoveFavorite}
      onAddFavorite={onAddFavorite}
      selectedPhone={phoneNumber}
    />

    <PhoneInput
      value={phoneNumber}
      onChangeText={onPhoneChange}
      onValidation={onValidation}
    />
  </View>
);
