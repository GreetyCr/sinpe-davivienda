import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export const DescriptionField = ({ value, onChangeText }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>Descripción (opcional)</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="¿Para qué es este pago?"
      placeholderTextColor={Colors.text.light}
      maxLength={50}
      multiline
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Colors.text.primary,
    minHeight: 60,
    textAlignVertical: "top",
  },
});
