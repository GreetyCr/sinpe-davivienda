import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

const PROVIDERS = [
  { id: "movistar", label: "Movistar" },
  { id: "kolbi", label: "Kolbi" },
  { id: "claro", label: "Claro" },
] as const;

export type ChargeProvider = (typeof PROVIDERS)[number]["id"];

type Props = {
  method: ChargeProvider;
  onChange: (value: ChargeProvider) => void;
};

export const ProviderSelector = ({ method, onChange }: Props) => (
  <View style={styles.container}>
    {PROVIDERS.map(({ id, label }) => (
      <Pressable
        key={id}
        style={[styles.button, method === id && styles.active]}
        onPress={() => onChange(id)}
      >
        <View style={styles.logoWrapper}>
          <View style={[styles.logoPlaceholder, method === id && styles.logoActive]}>
            <Text
              style={[
                styles.logoText,
                method === id && styles.logoTextActive,
              ]}
            >
              {label[0]}
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              method === id && styles.textActive,
            ]}
          >
            {label}
          </Text>
        </View>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.ui.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.md,
  },
  active: {
    backgroundColor: Colors.primary.red,
    borderColor: Colors.primary.red,
  },
  logoWrapper: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.secondary,
  },
  logoActive: {
    borderColor: Colors.complementary.white,
    backgroundColor: `${Colors.complementary.white}20`,
  },
  logoText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  logoTextActive: {
    color: Colors.complementary.white,
  },
  text: {
    fontSize: Typography.sizes.base,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  textActive: {
    color: Colors.complementary.white,
  },
});
