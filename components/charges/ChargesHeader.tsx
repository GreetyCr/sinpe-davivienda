import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { User } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface ChargesHeaderProps {
  user: User;
}

export const ChargesHeader: React.FC<ChargesHeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar un cobro</Text>
      <Text style={styles.subtitle}>
        {user.phoneNumber} - {user.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.complementary.white,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.ui.divider,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    marginTop: Spacing.xs,
    color: Colors.text.secondary,
    fontSize: Typography.sizes.sm,
  },
});

