import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

type Props = {
  primaryLabel: string;
  onCancel: () => void;
  onContinue: () => void;
  primaryIcon?: string;
};

export const ActionButtons = ({
  primaryLabel,
  primaryIcon = "arrow-forward",
  onCancel,
  onContinue,
}: Props) => (
  <View style={styles.row}>
    <Pressable style={styles.cancel} onPress={onCancel}>
      <Text style={styles.cancelText}>Cancelar</Text>
    </Pressable>

    <Pressable style={styles.continue} onPress={onContinue}>
      <Text style={styles.continueText}>{primaryLabel}</Text>
      <Icon name={primaryIcon} size={20} color={Colors.complementary.white} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  cancel: {
    flex: 1,
    backgroundColor: Colors.text.light,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
  },
  cancelText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  continue: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primary.red,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    shadowColor: Colors.primary.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
  },
});
