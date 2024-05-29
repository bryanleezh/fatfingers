import { create } from "zustand";

type SettingsState = {
    time: number;
    setTime: (time: number) => void;
    mode: 'time' | 'words';
    setMode: (mode: 'time' | 'words') => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
    time: 30,
    setTime: (time: number) => set({ time }),
    mode: 'time',
    setMode: (mode: 'time' | 'words') => set({ mode }),
}));