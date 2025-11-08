import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import ChatWidget from "../../components/ChatWidget";

export default function TabsLayout() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary.red,
          tabBarInactiveTintColor: Colors.text.secondary,
          tabBarStyle: {
            backgroundColor: Colors.background.primary,
            borderTopColor: Colors.ui.border,
            height: 85,
            paddingBottom: 25,
            paddingTop: 8,
          },
          headerStyle: { backgroundColor: Colors.primary.red },
          headerTintColor: Colors.text.white,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={require("@/assets/silueta_logo_grueso-02.png")}
              style={{ width: 120, height: 40, resizeMode: "contain" }}
            />
          ),
          headerLeft: () => (
            <Pressable onPress={() => console.log("Menú")} style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="menu" size={26} color="#fff" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => setChatVisible(true)} style={{ marginRight: 12 }}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={26}
                color="#fff"
              />
            </Pressable>
          ),
        }}
      >
        {/* tus tabs aquí */}
      </Tabs>

      <ChatWidget visible={chatVisible} onClose={() => setChatVisible(false)} />
    </>
  );
}
