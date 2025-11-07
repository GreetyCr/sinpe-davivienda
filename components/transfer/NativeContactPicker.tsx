import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface NativeContactPickerProps {
  onSelectContact: (phoneNumber: string, name?: string) => void;
}

export const NativeContactPicker: React.FC<NativeContactPickerProps> = ({
  onSelectContact,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
              onSelectContact(formatted, contact.name);
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
        }
      }
    } catch (error) {
      console.error('Error al acceder a contactos:', error);
      Alert.alert(
        'Error',
        'No se pudo acceder a los contactos.',
        [{ text: 'Entendido' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleOpenContacts}
        disabled={isLoading}
      >
        <View style={styles.iconCircle}>
          <Icon 
            name={isLoading ? "hourglass-empty" : "contacts"} 
            size={24} 
            color={Colors.primary.red} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {isLoading ? 'Abriendo...' : 'Seleccionar contacto'}
          </Text>
          <Text style={styles.subtitle}>
            {Platform.OS === 'ios' 
              ? 'Desde tu iPhone'
              : 'Desde tu teléfono'
            }
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color={Colors.text.secondary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: Colors.background.secondary,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
});

