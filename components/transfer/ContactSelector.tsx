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
  onRemoveFavorite: (contactId: string) => void;
  onAddFavorite: () => void;
  selectedPhone?: string;
}

export const ContactSelector: React.FC<ContactSelectorProps> = ({
  contacts,
  onSelectContact,
  onSelectFromNative,
  onRemoveFavorite,
  onAddFavorite,
  selectedPhone,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingNative, setIsLoadingNative] = useState(false);

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
      setIsLoadingNative(true);

      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permisos necesarios',
          'Necesitamos acceso a tus contactos para seleccionar un destinatario.',
          [{ text: 'Entendido' }]
        );
        setIsLoadingNative(false);
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
            setIsLoadingNative(false);
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
      setIsLoadingNative(false);
    }
  };

  const handleRemoveFavorite = (contact: Contact) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Deseas eliminar a ${contact.name} de tus favoritos?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            onRemoveFavorite(contact.id);
            if (contacts.length <= 1) {
              setIsEditMode(false);
            }
          },
        },
      ]
    );
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.columnsWrapper}>
        {/* Columna izquierda: Contactos */}
        <View style={styles.leftColumn}>
          <Text style={styles.columnTitle}>Contactos</Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.selectContactCard,
              pressed && styles.cardPressed,
              isLoadingNative && styles.cardDisabled,
            ]}
            onPress={handleOpenContacts}
            disabled={isLoadingNative || isEditMode}
          >
            <View style={styles.selectIconCircle}>
              <Icon 
                name={isLoadingNative ? "hourglass-empty" : "person-search"} 
                size={24} 
                color={Colors.complementary.white} 
              />
            </View>
            <Text style={styles.selectContactText}>
              {isLoadingNative ? 'Abriendo...' : 'Seleccionar\ncontacto'}
            </Text>
          </Pressable>
        </View>

        {/* Separador vertical */}
        <View style={styles.divider} />

        {/* Columna derecha: Favoritos */}
        <View style={styles.rightColumn}>
          <View style={styles.favoritesHeader}>
            <Text style={styles.columnTitle}>Favoritos</Text>
            {contacts.length > 0 && (
              <Pressable
                style={({ pressed }) => [
                  styles.editButton,
                  pressed && styles.editButtonPressed,
                ]}
                onPress={toggleEditMode}
              >
                <Text style={styles.editButtonText}>
                  {isEditMode ? 'Listo' : 'Editar'}
                </Text>
              </Pressable>
            )}
          </View>

          {/* Scroll horizontal de favoritos */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Cards de contactos favoritos */}
            {contacts.map((contact) => {
              const isSelected = selectedPhone === contact.phoneNumber;
              const avatarColor = getAvatarColor(contact.name);

              return (
                <Pressable
                  key={contact.id}
                  style={({ pressed }) => [
                    styles.contactCard,
                    isSelected && styles.contactCardSelected,
                    pressed && !isEditMode && styles.cardPressed,
                  ]}
                  onPress={() => !isEditMode && onSelectContact(contact)}
                  disabled={isEditMode}
                >
                  {/* X de eliminar en modo edición */}
                  {isEditMode && (
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => handleRemoveFavorite(contact)}
                    >
                      <Icon name="cancel" size={24} color={Colors.status.error} />
                    </Pressable>
                  )}

                  {/* Estrella de favorito */}
                  {!isEditMode && contact.isFavorite && (
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

                  {isSelected && !isEditMode && (
                    <View style={styles.selectedIndicator}>
                      <Icon name="check-circle" size={20} color={Colors.status.success} />
                    </View>
                  )}
                </Pressable>
              );
            })}

            {/* Última card: Agregar favorito (solo fuera de modo edición) */}
            {!isEditMode && (
              <Pressable
                style={({ pressed }) => [
                  styles.addFavoriteCard,
                  pressed && styles.cardPressed,
                ]}
                onPress={onAddFavorite}
              >
                <View style={styles.addIconCircle}>
                  <Icon name="person-add" size={28} color={Colors.complementary.white} />
                </View>
                <Text style={styles.addFavoriteText} numberOfLines={2}>
                  Agregar{'\n'}favorito
                </Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.red,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  columnsWrapper: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  leftColumn: {
    flex: 0.28,
    gap: Spacing.sm,
  },
  rightColumn: {
    flex: 0.72,
    gap: Spacing.sm,
  },
  divider: {
    width: 2,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderLeftColor: Colors.complementary.white,
    borderStyle: 'dashed',
    marginHorizontal: Spacing.xs,
  },
  columnTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
    marginBottom: Spacing.xs,
  },
  favoritesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: Colors.complementary.white,
  },
  editButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.complementary.white,
  },
  scrollContent: {
    gap: Spacing.md,
  },
  // Card de seleccionar contacto
  selectContactCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.complementary.white,
    minHeight: 120,
    gap: Spacing.sm,
  },
  selectIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContactText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  // Cards de contactos
  contactCard: {
    width: 100,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  contactCardSelected: {
    borderColor: Colors.status.success,
    shadowColor: Colors.status.success,
    shadowOpacity: 0.3,
  },
  cardPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 10,
    backgroundColor: Colors.complementary.white,
    borderRadius: 12,
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
  // Card de agregar favorito
  addFavoriteCard: {
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.complementary.white,
    borderStyle: 'dashed',
  },
  addIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  addFavoriteText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
    textAlign: 'center',
    lineHeight: 16,
  },
});

