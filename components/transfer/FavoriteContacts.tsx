import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Contact } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface FavoriteContactsProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onRemoveFavorite: (contactId: string) => void;
  onAddFavorite: () => void;
  selectedPhone?: string;
}

export const FavoriteContacts: React.FC<FavoriteContactsProps> = ({
  contacts,
  onSelectContact,
  onRemoveFavorite,
  onAddFavorite,
  selectedPhone,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

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
            // Si solo queda un favorito después de eliminar, salir del modo edición
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

  if (contacts.length === 0) {
    return null; // No mostrar sección si no hay favoritos
  }

  return (
    <View style={styles.container}>
      {/* Header con título y botón editar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="star" size={20} color={Colors.primary.yellow} />
          <Text style={styles.title}>Favoritos</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.editButtonPressed,
          ]}
          onPress={toggleEditMode}
        >
          <Text style={[styles.editButtonText, isEditMode && styles.editButtonTextActive]}>
            {isEditMode ? 'Listo' : 'Editar'}
          </Text>
        </Pressable>
      </View>

      {/* Scroll horizontal de contactos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contactos favoritos */}
        {contacts.map((contact) => {
          const isSelected = selectedPhone === contact.phoneNumber;
          const avatarColor = getAvatarColor(contact.name);

          return (
            <Pressable
              key={contact.id}
              style={({ pressed }) => [
                styles.contactCard,
                isSelected && styles.contactCardSelected,
                pressed && !isEditMode && styles.contactCardPressed,
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

        {/* Card de agregar favorito */}
        {!isEditMode && (
          <Pressable
            style={({ pressed }) => [
              styles.addFavoriteCard,
              pressed && styles.addFavoriteCardPressed,
            ]}
            onPress={onAddFavorite}
          >
            <View style={styles.addFavoriteIconCircle}>
              <Icon name="person-add" size={24} color={Colors.primary.red} />
            </View>
            <Text style={styles.addFavoriteText} numberOfLines={2}>
              Agregar{'\n'}favorito
            </Text>
          </Pressable>
        )}
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
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  editButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  editButtonPressed: {
    backgroundColor: Colors.background.secondary,
  },
  editButtonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary.red,
  },
  editButtonTextActive: {
    color: Colors.primary.blue,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xs,
    gap: Spacing.md,
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
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 10,
    backgroundColor: Colors.complementary.white,
    borderRadius: 12,
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
  addFavoriteCardPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  addFavoriteIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.primary.red}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  addFavoriteText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary.red,
    textAlign: 'center',
    lineHeight: 16,
  },
});

