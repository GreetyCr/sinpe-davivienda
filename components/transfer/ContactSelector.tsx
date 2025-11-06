import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';
import { Contact } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ContactSelectorProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onSelectFromNative: (phoneNumber: string, name?: string) => void;
  selectedPhone?: string;
}

export const ContactSelector: React.FC<ContactSelectorProps> = ({
  contacts,
  onSelectContact,
  onSelectFromNative,
  selectedPhone,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      Colors.primary.red,
      Colors.primary.blue,
      Colors.primary.orange,
      Colors.status.success,
      Colors.complementary.teal,
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const withoutCountryCode = cleaned.startsWith('506') 
      ? cleaned.slice(3) 
      : cleaned;
    const last8 = withoutCountryCode.slice(-8);
    
    if (last8.length === 8) {
      return `${last8.slice(0, 4)}-${last8.slice(4)}`;
    }
    return last8;
  };

  const handleOpenContacts = async () => {
    try {
      setIsLoading(true);

      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permisos necesarios',
          'Necesitamos acceso a tus contactos para seleccionar un destinatario.',
          [{ text: 'Entendido' }]
        );
        setIsLoading(false);
        return;
      }

      if (Platform.OS === 'ios') {
        const contact = await Contacts.presentContactPickerAsync();
        
        if (contact) {
          const phoneNumber = contact.phoneNumbers?.[0]?.number;
          
          if (phoneNumber) {
            const formatted = formatPhoneNumber(phoneNumber);
            if (formatted.length === 9) {
              onSelectFromNative(formatted, contact.name);
            } else {
              Alert.alert(
                'Número inválido',
                'El número de teléfono debe tener 8 dígitos.',
                [{ text: 'Entendido' }]
              );
            }
          } else {
            Alert.alert(
              'Sin número',
              'Este contacto no tiene número de teléfono.',
              [{ text: 'Entendido' }]
            );
          }
        }
      } else {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
          sort: Contacts.SortTypes.FirstName,
        });

        if (data.length > 0) {
          const contactsWithPhones = data.filter(
            (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0
          );

          if (contactsWithPhones.length === 0) {
            Alert.alert(
              'Sin contactos',
              'No se encontraron contactos con números de teléfono.',
              [{ text: 'Entendido' }]
            );
            setIsLoading(false);
            return;
          }

          Alert.alert(
            'Selección de contactos',
            `Se encontraron ${contactsWithPhones.length} contactos. En esta versión demo, por favor escribe el número manualmente.`,
            [{ text: 'Entendido' }]
          );
        } else {
          Alert.alert(
            'Sin contactos',
            'No se encontraron contactos en tu dispositivo.',
            [{ text: 'Entendido' }]
          );
        }
      }
    } catch (error) {
      console.error('Error al acceder a contactos:', error);
      Alert.alert(
        'Error',
        'No se pudo acceder a los contactos. Por favor, intenta de nuevo.',
        [{ text: 'Entendido' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="contacts" size={20} color={Colors.text.secondary} />
        <Text style={styles.title}>Contactos</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Botón de agregar contacto nativo */}
        <Pressable
          style={({ pressed }) => [
            styles.addContactButton,
            pressed && styles.addContactButtonPressed,
            isLoading && styles.addContactButtonLoading,
          ]}
          onPress={handleOpenContacts}
          disabled={isLoading}
        >
          <View style={styles.addIconCircle}>
            <Icon 
              name={isLoading ? "hourglass-empty" : "person-add"} 
              size={24} 
              color={Colors.primary.red} 
            />
          </View>
          <Text style={styles.addContactText} numberOfLines={2}>
            {isLoading ? 'Abriendo...' : 'Agregar\ncontacto'}
          </Text>
        </Pressable>

        {/* Contactos frecuentes */}
        {contacts.map((contact) => {
          const isSelected = selectedPhone === contact.phoneNumber;
          const avatarColor = getAvatarColor(contact.name);

          return (
            <Pressable
              key={contact.id}
              style={({ pressed }) => [
                styles.contactCard,
                isSelected && styles.contactCardSelected,
                pressed && styles.contactCardPressed,
              ]}
              onPress={() => onSelectContact(contact)}
            >
              {contact.isFavorite && (
                <View style={styles.favoriteBadge}>
                  <Icon name="star" size={12} color={Colors.primary.yellow} />
                </View>
              )}

              <View
                style={[
                  styles.avatar,
                  { backgroundColor: `${avatarColor}20` },
                  isSelected && { backgroundColor: avatarColor },
                ]}
              >
                <Text
                  style={[
                    styles.initials,
                    { color: avatarColor },
                    isSelected && { color: Colors.complementary.white },
                  ]}
                >
                  {getInitials(contact.name)}
                </Text>
              </View>

              <Text style={styles.contactName} numberOfLines={1}>
                {contact.name.split(' ')[0]}
              </Text>
              <Text style={styles.contactPhone} numberOfLines={1}>
                {contact.phoneNumber}
              </Text>

              {isSelected && (
                <View style={styles.selectedIndicator}>
                  <Icon name="check-circle" size={20} color={Colors.status.success} />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xs,
    gap: Spacing.md,
  },
  // Botón de agregar contacto
  addContactButton: {
    width: 100,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    borderStyle: 'dashed',
  },
  addContactButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  addContactButtonLoading: {
    opacity: 0.6,
  },
  addIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  addContactText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary.red,
    textAlign: 'center',
    lineHeight: 16,
  },
  // Cards de contactos
  contactCard: {
    width: 100,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  contactCardSelected: {
    borderColor: Colors.status.success,
    shadowColor: Colors.status.success,
    shadowOpacity: 0.3,
  },
  contactCardPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  initials: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  contactName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
});

