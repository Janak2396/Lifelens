import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LifeLens</Text>
      <Text style={styles.subtitle}>Focus. Track. Improve.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 16,
  },
});
