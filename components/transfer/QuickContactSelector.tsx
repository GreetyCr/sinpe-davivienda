import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Contact } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface QuickContactSelectorProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedPhone?: string;
}

export const QuickContactSelector: React.FC<QuickContactSelectorProps> = ({
  contacts,
  onSelectContact,
  selectedPhone,
}) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="people" size={20} color={Colors.text.secondary} />
        <Text style={styles.title}>Contactos frecuentes</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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

