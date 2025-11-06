import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.logo}>
        🏠
      </Text>
      <Text variant="headlineLarge" style={styles.text}>
        SINPE Davivienda
      </Text>
      <ActivityIndicator size="large" color={Colors.primary.red} style={styles.loader} />
      <Text variant="bodyMedium" style={styles.subtitle}>
        Cargando aplicación...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.red,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  text: {
    color: Colors.text.white,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  loader: {
    marginVertical: 16,
  },
  subtitle: {
    color: Colors.text.white,
    opacity: 0.9,
  },
});

