import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TaskContext } from "../../lib/taskContext";
import { colors } from "../../theme/colors";

export default function StatsScreen() {
  const { state } = useContext(TaskContext);

  const now = new Date();
  const today = now.toDateString();
  const weekStart = new Date();
  weekStart.setDate(now.getDate() - 6);
  const month = now.getMonth();
  const year = now.getFullYear();

  // Counters
  let dailyTotal = 0,
      dailyCompleted = 0,
      weeklyTotal = 0,
      weeklyCompleted = 0,
      monthlyTotal = 0,
      monthlyCompleted = 0,
      yearlyTotal = 0,
      yearlyCompleted = 0;

  state.tasks.forEach(task => {
    const tDate = new Date(task.createdAt);
    const isCompleted = task.status === "completed";

    // Daily
    if (tDate.toDateString() === today) {
      dailyTotal++;
      if (isCompleted) dailyCompleted++;
    }

    // Weekly
    if (tDate >= weekStart) {
      weeklyTotal++;
      if (isCompleted) weeklyCompleted++;
    }

    // Monthly
    if (tDate.getMonth() === month && tDate.getFullYear() === year) {
      monthlyTotal++;
      if (isCompleted) monthlyCompleted++;
    }

    // Yearly
    if (tDate.getFullYear() === year) {
      yearlyTotal++;
      if (isCompleted) yearlyCompleted++;
    }
  });

  // Helper to calculate completion %
  const getPercentage = (completed: number, total: number) =>
    total ? Math.round((completed / total) * 100) : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Task Stats</Text>

      {/* Daily */}
      <View style={styles.card}>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.value}>{dailyTotal}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getPercentage(dailyCompleted, dailyTotal)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {dailyCompleted} completed / {dailyTotal} total
        </Text>
      </View>

      {/* Weekly */}
      <View style={styles.card}>
        <Text style={styles.label}>Last 7 Days</Text>
        <Text style={styles.value}>{weeklyTotal}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getPercentage(weeklyCompleted, weeklyTotal)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {weeklyCompleted} completed / {weeklyTotal} total
        </Text>
      </View>

      {/* Monthly */}
      <View style={styles.card}>
        <Text style={styles.label}>This Month</Text>
        <Text style={styles.value}>{monthlyTotal}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getPercentage(monthlyCompleted, monthlyTotal)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {monthlyCompleted} completed / {monthlyTotal} total
        </Text>
      </View>

      {/* Yearly */}
      <View style={styles.card}>
        <Text style={styles.label}>This Year</Text>
        <Text style={styles.value}>{yearlyTotal}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getPercentage(yearlyCompleted, yearlyTotal)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {yearlyCompleted} completed / {yearlyTotal} total
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: { fontSize: 16, color: colors.muted, marginBottom: 8 },
  value: { fontSize: 28, fontWeight: "700", color: colors.text },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    marginTop: 3,
    fontSize: 12,
    color: colors.muted,
  },
});
