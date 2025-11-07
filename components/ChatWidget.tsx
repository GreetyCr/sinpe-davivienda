import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatWidgetProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChatWidget({ visible, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Obtener o crear sessionId una sola vez
  useEffect(() => {
    (async () => {
      try {
        let id = await AsyncStorage.getItem("sessionId");
        if (!id) {
          id = uuidv4();
          await AsyncStorage.setItem("sessionId", id);
        }
        setSessionId(id);
      } catch (e) {
      }
    })();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(
        "https://bd4e1bca-49b4-4ce6-a714-3e86deee91a4.clouding.host/webhook/f73a3e2b-aaa2-4aa4-97dd-34ef79be7f96",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input, sessionId }),
        }
      );

      console.log("Estado:", res.status);


        const data = await res.json();
        const botMsg: ChatMessage = {
        sender: "bot",
        text: data.output || data.reply || "Sin respuesta",
        };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al conectar" },
      ]);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.chat}>
          <FlatList
            data={messages}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubble,
                  item.sender === "user"
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text
                  style={{
                    color: item.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />

          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Escribe aquí..."
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Text style={{ color: "#fff", fontSize: 18 }}>→</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ color: "#fff" }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  chat: {
    backgroundColor: "#fff",
    height: "60%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#d32f2f",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bubble: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#d32f2f",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: "#d32f2f",
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
