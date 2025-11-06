import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          🔧 Servicios
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Recargas telefónicas y más
        </Text>
        
        <View style={styles.infoBox}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Esta pantalla mostrará:
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Selector de operadora (Kolbi, Claro, Movistar)
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Input de número de teléfono
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Selector de monto (₡5,000, ₡10,000, ₡15,000)
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Confirmación antes de recargar
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Historial de recargas realizadas
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
    borderLeftColor: Colors.complementary.teal,
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

