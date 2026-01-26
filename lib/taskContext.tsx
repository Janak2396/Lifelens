import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import uuid from "react-native-uuid";
import { Task } from "../types/task";
import { TaskRepository } from "./taskRepository";

type State = { tasks: Task[]; hydrated: boolean };

type Action =
  | { type: "HYDRATE_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: { title: string; description?: string } }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string };

const initialState: State = { tasks: [], hydrated: false };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "HYDRATE_TASKS":
      return { ...state, tasks: action.payload, hydrated: true };

    case "ADD_TASK": {
      const newTask: Task = {
        id: uuid.v4().toString(), // fixed for React Native
        title: action.payload.title,
        description: action.payload.description,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTasks = [newTask, ...state.tasks];
      TaskRepository.saveAll(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case "UPDATE_TASK": {
      const updatedTasks = state.tasks.map((t) =>
        t.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : t
      );
      TaskRepository.saveAll(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter((t) => t.id !== action.payload);
      TaskRepository.saveAll(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};

export const TaskContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const tasks = await TaskRepository.getAll();
        dispatch({ type: "HYDRATE_TASKS", payload: tasks });
      } catch (err) {
        console.error("Hydration failed:", err);
      }
    })();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
