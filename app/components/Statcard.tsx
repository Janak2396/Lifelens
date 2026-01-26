// app/components/StatCard.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  label: { fontSize: 16, color: colors.muted, marginBottom: 4 },
  value: { fontSize: 24, fontWeight: "bold", color: colors.text },
});
