import { create } from "zustand";

type GameState = {
    isFocused: boolean;
    setFocused: (isFocused: boolean) => void;
    endGame: boolean,
    setEndGame: (endGame: boolean) => void,
    accuracy: number,
    setAccuracy: (accuracy: number) => void,
    errorPercentage: number,
    setErrorPercentage: (errorPercentage: number) => void,
    netwpm: number,
    setNetwpm: (netwpm: number) => void,
    cpm: number,
    setCpm: (cpm: number) => void,
    cursor: number,
    setIncreaseCursor: () => void,
    setDecreaseCursor: () => void,
    setResetCursor: () => void,
}

export const useGameStateStore = create<GameState>((set) => ({
    isFocused: false,
    setFocused: (isFocused: boolean) => set({ isFocused }),
    endGame: false,
    setEndGame: (endGame) => set({ endGame }),
    accuracy: 0,
    setAccuracy: (accuracy) => set({ accuracy }),
    errorPercentage: 0,
    setErrorPercentage: (errorPercentage) => set({ errorPercentage }),
    netwpm: 0,
    setNetwpm: (netwpm) => set({ netwpm }),
    cpm: 0,
    setCpm: (cpm) => set({ cpm }),
    cursor: 0,
    setIncreaseCursor: () => set((state) => ({ cursor: state.cursor + 1})),
    setDecreaseCursor: () => set((state) => ({ cursor: state.cursor - 1})),
    setResetCursor: () => set({ cursor: 0 }),
}))