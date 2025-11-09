import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { User } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface HistoryHeaderProps {
  user: User;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Icon name="person" size={22} color={Colors.primary.red} />
        </View>
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary.red}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  userName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
  },
  userPhone: {
    marginTop: 2,
    color: Colors.text.secondary,
    fontSize: Typography.sizes.sm,
  },
});

