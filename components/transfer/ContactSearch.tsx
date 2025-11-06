import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Contact } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ContactSearchProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedPhone?: string;
}

export const ContactSearch: React.FC<ContactSearchProps> = ({
  contacts,
  onSelectContact,
  selectedPhone,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

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

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phoneNumber.includes(query)
    );
  });

  const handleContactPress = (contact: Contact) => {
    onSelectContact(contact);
    setSearchQuery('');
    setIsExpanded(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchHeader}>
        <Icon name="search" size={20} color={Colors.text.secondary} />
        <Text style={styles.searchTitle}>Buscar contactos</Text>
      </View>

      <Pressable
        style={[styles.searchInputContainer, isExpanded && styles.searchInputContainerExpanded]}
        onPress={() => setIsExpanded(true)}
      >
        <Icon name="search" size={20} color={Colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsExpanded(true)}
          placeholder="Buscar por nombre o teléfono..."
          placeholderTextColor={Colors.text.light}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color={Colors.text.secondary} />
          </Pressable>
        )}
      </Pressable>

      {/* Results */}
      {isExpanded && searchQuery.length > 0 && (
        <View style={styles.resultsContainer}>
          {filteredContacts.length > 0 ? (
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const isSelected = selectedPhone === item.phoneNumber;
                const avatarColor = getAvatarColor(item.name);

                return (
                  <Pressable
                    style={({ pressed }) => [
                      styles.contactItem,
                      isSelected && styles.contactItemSelected,
                      pressed && styles.contactItemPressed,
                    ]}
                    onPress={() => handleContactPress(item)}
                  >
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: `${avatarColor}20` },
                      ]}
                    >
                      <Text style={[styles.initials, { color: avatarColor }]}>
                        {getInitials(item.name)}
                      </Text>
                    </View>

                    <View style={styles.contactInfo}>
                      <View style={styles.nameRow}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        {item.isFavorite && (
                          <Icon name="star" size={16} color={Colors.primary.yellow} />
                        )}
                      </View>
                      <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
                    </View>

                    {isSelected && (
                      <Icon name="check-circle" size={24} color={Colors.status.success} />
                    )}
                  </Pressable>
                );
              }}
              ListFooterComponent={
                <Pressable
                  style={styles.collapseButton}
                  onPress={() => {
                    setIsExpanded(false);
                    setSearchQuery('');
                  }}
                >
                  <Icon name="expand-less" size={20} color={Colors.text.secondary} />
                  <Text style={styles.collapseText}>Cerrar búsqueda</Text>
                </Pressable>
              }
            />
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search-off" size={48} color={Colors.text.light} />
              <Text style={styles.emptyText}>No se encontraron contactos</Text>
              <Text style={styles.emptySubtext}>
                Intenta con otro nombre o número
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Info helper when not searching */}
      {!isExpanded && (
        <Text style={styles.helperText}>
          Toca aquí para buscar entre todos tus contactos
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  searchTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
  },
  searchInputContainerExpanded: {
    borderColor: Colors.primary.red,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text.primary,
  },
  helperText: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  resultsContainer: {
    marginTop: Spacing.md,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    maxHeight: 300,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.divider,
    gap: Spacing.md,
  },
  contactItemSelected: {
    backgroundColor: `${Colors.status.success}10`,
  },
  contactItemPressed: {
    backgroundColor: Colors.background.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  contactInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },
  contactName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  contactPhone: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  collapseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  collapseText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.text.secondary,
  },
});

