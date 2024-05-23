import { create } from "zustand";

export const useSettingsStore = create((set) => {
    time: 30
    setTime: (time: number) => set({ time })
    mode: 'time'
    setMode: (mode: 'time' | 'words') => set({ mode })
})