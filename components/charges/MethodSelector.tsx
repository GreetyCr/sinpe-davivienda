import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

type Props = {
  method: "qr" | "sms";
  onChange: (value: "qr" | "sms") => void;
};

export const MethodSelector = ({ method, onChange }: Props) => (
  <View style={styles.container}>
    <Pressable
      style={[styles.button, method === "qr" && styles.active]}
      onPress={() => onChange("qr")}
    >
      <Icon
        name="qr-code-2"
        size={28}
        color={
          method === "qr"
            ? Colors.complementary.white
            : Colors.text.primary
        }
      />
      <Text
        style={[
          styles.text,
          method === "qr" && styles.textActive,
        ]}
      >
        QR
      </Text>
    </Pressable>

    <Pressable
      style={[styles.button, method === "sms" && styles.active]}
      onPress={() => onChange("sms")}
    >
      <Icon
        name="sms"
        size={26}
        color={
          method === "sms"
            ? Colors.complementary.white
            : Colors.text.primary
        }
      />
      <Text
        style={[
          styles.text,
          method === "sms" && styles.textActive,
        ]}
      >
        SMS
      </Text>
    </Pressable>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.ui.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.background.primary,
    gap: Spacing.xs,
  },
  active: {
    backgroundColor: Colors.primary.red,
    borderColor: Colors.primary.red,
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
