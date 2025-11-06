import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

export default function TransferScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          💸 Transferir
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Realizar transferencias SINPE
        </Text>
        
        <View style={styles.infoBox}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Esta pantalla mostrará:
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Input de número de teléfono o IBAN
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Autocompletado de contactos frecuentes
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Input de monto con validación
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Input de descripción opcional
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Preview y confirmación antes de enviar
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
    borderLeftColor: Colors.primary.blue,
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

