import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { TaskProvider } from "../lib/taskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <View style={styles.container}>
        <Slot />
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
