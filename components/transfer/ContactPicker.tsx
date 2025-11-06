import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ContactPickerProps {
  onSelectContact: (phoneNumber: string, name?: string) => void;
}

export const ContactPicker: React.FC<ContactPickerProps> = ({
  onSelectContact,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (phone: string): string => {
    // Extraer solo números
    const cleaned = phone.replace(/\D/g, '');
    
    // Si tiene código de país +506, quitarlo
    const withoutCountryCode = cleaned.startsWith('506') 
      ? cleaned.slice(3) 
      : cleaned;
    
    // Tomar los últimos 8 dígitos
    const last8 = withoutCountryCode.slice(-8);
    
    // Formatear como 8888-7777
    if (last8.length === 8) {
      return `${last8.slice(0, 4)}-${last8.slice(4)}`;
    }
    
    return last8;
  };

  const handleOpenContacts = async () => {
    try {
      setIsLoading(true);

      // Solicitar permisos
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

      // Abrir selector de contactos (solo iOS soporta presentContactPickerAsync)
      if (Platform.OS === 'ios') {
        const contact = await Contacts.presentContactPickerAsync();
        
        if (contact) {
          // Obtener el primer número de teléfono
          const phoneNumber = contact.phoneNumbers?.[0]?.number;
          
          if (phoneNumber) {
            const formatted = formatPhoneNumber(phoneNumber);
            if (formatted.length === 9) { // 8 dígitos + guión
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
        // Android: Obtener todos los contactos y mostrar lista
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
          sort: Contacts.SortTypes.FirstName,
        });

        if (data.length > 0) {
          // En Android, mostramos un alert para seleccionar
          // En producción podrías usar un modal personalizado
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

          // Tomar el primer contacto como ejemplo (en producción usarías un modal)
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
      <View style={styles.header}>
        <Icon name="contacts" size={20} color={Colors.text.secondary} />
        <Text style={styles.title}>Desde tus contactos</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleOpenContacts}
        disabled={isLoading}
      >
        <View style={styles.buttonContent}>
          <View style={styles.iconCircle}>
            <Icon 
              name="person-add" 
              size={24} 
              color={Colors.primary.red} 
            />
          </View>
          <View style={styles.buttonText}>
            <Text style={styles.buttonTitle}>
              {isLoading ? 'Abriendo...' : 'Seleccionar de contactos'}
            </Text>
            <Text style={styles.buttonSubtitle}>
              {Platform.OS === 'ios' 
                ? 'Elige un contacto de tu iPhone'
                : 'Elige un contacto de tu teléfono'
              }
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={Colors.text.secondary} />
        </View>
      </Pressable>

      <Text style={styles.helperText}>
        O escribe el número manualmente abajo
      </Text>
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
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  button: {
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.md,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  buttonSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  helperText: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
    marginLeft: Spacing.xs,
    textAlign: 'center',
  },
});

