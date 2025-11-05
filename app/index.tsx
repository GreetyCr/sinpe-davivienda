import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { Colors } from '../constants/Colors';

export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary.red} />
      <Text variant="headlineMedium" style={styles.text}>
        SINPE Davivienda
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Cargando...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  text: {
    marginTop: 16,
    color: Colors.primary.red,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    color: Colors.text.secondary,
  },
});

