import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: colors.primary },
  logo: { width: 32, height: 32, marginRight: 12 },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
});
