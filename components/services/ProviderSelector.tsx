import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import ClaroLogo from "@/assets/claro_logo.png";
import KolbiLogo from "@/assets/kolbi_logo.png";
import LibertyLogo from "@/assets/liberty_logo.png";

export const PROVIDERS = [
  { id: "liberty", label: "Liberty", logo: LibertyLogo },
  { id: "kolbi", label: "Kolbi", logo: KolbiLogo, logoSize: 68 },
  { id: "claro", label: "Claro", logo: ClaroLogo },
] as const;

export type ChargeProvider = (typeof PROVIDERS)[number]["id"];

type Props = {
  method: ChargeProvider;
  onChange: (value: ChargeProvider) => void;
};

export const ProviderSelector = ({ method, onChange }: Props) => (
  <View style={styles.container}>
    {PROVIDERS.map(({ id, label, logo, logoSize }) => (
      <Pressable
        key={id}
        style={[styles.button, method === id && styles.active]}
        onPress={() => onChange(id)}
      >
        <View style={styles.logoWrapper}>
          <View style={[styles.logoPlaceholder, method === id && styles.logoActive]}>
            <Image
              source={logo}
              style={[styles.logo, logoSize && { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
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
    width: 68,
    height: 68,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.secondary,
  },
  logoActive: {
    borderColor: Colors.complementary.white,
    backgroundColor: Colors.complementary.white,
  },
  logo: {
    width: 52,
    height: 52,
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
