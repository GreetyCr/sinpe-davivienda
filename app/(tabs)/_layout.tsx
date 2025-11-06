import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Image } from "react-native";
import { Colors } from "../../constants/Colors";

export default function TabsLayout() {
  return (
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
          ></Image>
        ),
        headerLeft: () => (
          <Pressable
            onPress={() => console.log("Menú")}
            style={{ marginLeft: 12 }}
          >
            <MaterialCommunityIcons name="menu" size={26} color="#fff" />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => console.log("Ayuda")}
            style={{ marginRight: 12 }}
          >
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={26}
              color="#fff"
            />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transferir",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bank-transfer"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="charges"
        options={{
          title: "Cobros",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Servicios",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
