import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Beta User</Text>
        <Text style={styles.text}>LifeLens v0.1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 10,
  },
});
