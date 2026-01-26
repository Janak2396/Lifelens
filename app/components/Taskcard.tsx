import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/colors";
import { Task } from "../../types/task";

type TaskCardProps = {
  task: Task;
  dispatch: any;
};

export default function TaskCard({ task, dispatch }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const save = () => {
    if (!title.trim()) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({ type: "UPDATE_TASK", payload: { ...task, title: title.trim() } });
    setEditing(false);
  };

  const toggleStatus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      },
    });
  };

  const statusColor = task.status === "completed" ? "#4CAF50" : "#FFA500";

  return (
    <LinearGradient
      colors={["#ffffff", "#f0f4f8"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.card}
    >
      <View style={styles.header}>
        {/* Status Toggle */}
        <TouchableOpacity style={[styles.statusBtn, { backgroundColor: statusColor }]} onPress={toggleStatus}>
          <Ionicons
            name={task.status === "completed" ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {editing ? (
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Edit task title"
          />
        ) : (
          <Text style={styles.title}>{task.title}</Text>
        )}
      </View>

      <View style={styles.row}>
        {editing ? (
          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Ionicons name="checkmark" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setEditing(true)}
              style={[styles.iconBtn, styles.editBtn]}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                dispatch({ type: "DELETE_TASK", payload: task.id });
              }}
              style={[styles.iconBtn, styles.deleteBtn]}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: "600", color: colors.text, flex: 1 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
  },
  statusBtn: {
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  iconBtn: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: { backgroundColor: colors.primary },
  deleteBtn: { backgroundColor: "#FF4D4D" },
  saveBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
