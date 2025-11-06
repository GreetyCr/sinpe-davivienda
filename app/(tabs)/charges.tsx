import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

export default function ChargesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          📱 Cobros
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Generar y enviar cobros SINPE
        </Text>
        
        <View style={styles.infoBox}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Esta pantalla mostrará:
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Formulario para crear cobro
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Monto y descripción del cobro
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Generación de código QR
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Compartir cobro (WhatsApp, SMS, Email)
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Lista de cobros activos y expirados
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    color: Colors.primary.red,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  infoBox: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.md,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.yellow,
  },
  infoTitle: {
    color: Colors.text.primary,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  infoText: {
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
});

