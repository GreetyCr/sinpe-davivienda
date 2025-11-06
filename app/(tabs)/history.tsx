import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          📊 Historial
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Historial de transacciones SINPE
        </Text>
        
        <View style={styles.infoBox}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Esta pantalla mostrará:
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Lista de todas las transacciones
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Filtros por tipo y fecha
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Búsqueda por nombre o monto
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Pull to refresh
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Descargar comprobantes en PDF
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
    borderLeftColor: Colors.primary.orange,
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

