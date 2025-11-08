import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import { Spacing, BorderRadius } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

const createSessionId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatWidgetProps {
  visible: boolean;
  onClose: () => void;
}

const BOT_GREETING: ChatMessage = {
  sender: "bot",
  text: "👋 ¡Hola! Bienvenido a SINPE Davivienda.\nAquí podrás consultar tu saldo, hacer transferencias, revisar tu historial, generar cobros o realizar recargas.\nSi necesitas ayuda con alguno de estos pasos, escribe tu consulta o selecciona una opción para continuar.",
};

export default function ChatWidget({ visible, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([BOT_GREETING]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [typingDots, setTypingDots] = useState("...");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    (async () => {
      try {
        let id = await AsyncStorage.getItem("sessionId");
        if (!id) {
          id = createSessionId();
          await AsyncStorage.setItem("sessionId", id);
        }
        setSessionId(id);
      } catch (e) {
        // Si no se puede obtener la sesión continuamos con una temporal
      }
    })();
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!isSending) {
      setTypingDots("...");
      return undefined;
    }

    const sequence = ["", ".", "..", "..."];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % sequence.length;
      setTypingDots(sequence[index] || "...");
    }, 400);

    return () => clearInterval(interval);
  }, [isSending]);

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const trimmed = input.trim();
    const userMsg: ChatMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch(
        "https://bd4e1bca-49b4-4ce6-a714-3e86deee91a4.clouding.host/webhook/f73a3e2b-aaa2-4aa4-97dd-34ef79be7f96",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed, sessionId }),
        }
      );

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
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -30 : -30}
          style={styles.overlay}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={[
                styles.chatWrapper,
                keyboardVisible && styles.chatWrapperKeyboard,
              ]}
            >
              <View style={[styles.chat, keyboardVisible && styles.chatKeyboard]}>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                      <Icon
                        name="smart-toy"
                        size={22}
                        color={Colors.complementary.white}
                      />
                    </View>
                    <View>
                      <Text style={styles.title}>Asistente Davivienda</Text>
                      <Text style={styles.subtitle}>
                        Disponible para ayudarte
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Cerrar chat"
                    style={styles.closeButton}
                  >
                    <Icon
                      name="close"
                      size={20}
                      color={Colors.text.secondary}
                    />
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={styles.list}
                  data={messages}
                  keyExtractor={(_, i) => i.toString()}
                  contentContainerStyle={styles.listContent}
                  keyboardShouldPersistTaps="handled"
                  ref={listRef}
                  ListFooterComponent={
                    isSending ? (
                      <View style={[styles.bubble, styles.botBubble]}>
                        <View style={styles.typingDotsContainer}>
                          <Text style={styles.typingDots}>{typingDots}</Text>
                        </View>
                      </View>
                    ) : null
                  }
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
                        style={[
                          styles.bubbleText,
                          item.sender === "user" && styles.userText,
                        ]}
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
                    placeholderTextColor={Colors.text.secondary}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={sendMessage}
                    style={[
                      styles.sendBtn,
                      (isSending || !input.trim()) && styles.sendBtnDisabled,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Enviar mensaje"
                    disabled={isSending || !input.trim()}
                  >
                    {isSending ? (
                      <ActivityIndicator color={Colors.complementary.white} />
                    ) : (
                      <Icon
                        name="arrow-forward"
                        size={20}
                        color={Colors.complementary.white}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  chatWrapper: {
    width: "100%",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    maxHeight: "92%",
    minHeight: "66%",
  },
  chatWrapperKeyboard: {
    maxHeight: "78%",
    minHeight: "54%",
  },
  chat: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: "100%",
    shadowColor: Colors.ui.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
  chatKeyboard: {
    paddingVertical: Spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.ui.divider,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.red,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs / 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.secondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: Spacing.sm,
    flexGrow: 1,
  },
  bubble: {
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    maxWidth: "80%",
  },
  bubbleText: {
    color: Colors.text.primary,
    fontSize: Typography.sizes.md,
  },
  userText: {
    color: Colors.complementary.white,
  },
  userBubble: {
    backgroundColor: Colors.primary.red,
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: Colors.background.secondary,
    alignSelf: "flex-start",
  },
  typingDotsContainer: {
    minWidth: 23,
  },
  typingDots: {
    color: Colors.text.secondary,
    fontSize: Typography.sizes.lg,
    letterSpacing: 3,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
    borderRadius: BorderRadius.full,
    paddingLeft: Spacing.md,
    backgroundColor: Colors.background.secondary,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  sendBtn: {
    backgroundColor: Colors.primary.red,
    borderRadius: BorderRadius.full,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
  sendBtnDisabled: {
    opacity: 0.6,
  },
});
