import { create } from "zustand";

type SettingsState = {
    time: number;
    setTime: (time: number) => void;
    mode: 'time' | 'words';
    setMode: (mode: 'time' | 'words') => void;
    resetKey: "" | "Enter" | "Tab" | "Escape";
    setResetKey: (key: "Enter" | "Tab" | "Escape") => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
    time: 30,
    setTime: (time: number) => set({ time }),
    mode: 'time',
    setMode: (mode: 'time' | 'words') => set({ mode }),
    resetKey: "Enter",
    setResetKey: (resetKey: "Enter" | "Tab" | "Escape") => set({ resetKey }),
}));