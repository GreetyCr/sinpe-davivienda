import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Spacing';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          🏠 Inicio
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Pantalla principal de SINPE Davivienda
        </Text>
        
        <View style={styles.infoBox}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Esta pantalla mostrará:
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Saldo actual de la cuenta
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Accesos rápidos (Enviar, Cobrar, Recargar)
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Últimas 5 transacciones
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Pull to refresh
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
    borderLeftColor: Colors.primary.red,
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

