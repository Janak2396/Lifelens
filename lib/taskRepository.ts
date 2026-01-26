import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const STORAGE_KEY = "lifelens.tasks.v1";

export const TaskRepository = {
  async getAll(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error reading tasks:", err);
      return [];
    }
  },

  async saveAll(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Error saving tasks:", err);
    }
  },
};
