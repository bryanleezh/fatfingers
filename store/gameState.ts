import { create } from "zustand";

type GameState = {
    isFocused: boolean;
    setFocused: (isFocused: boolean) => void;
    gameStart: boolean;
    setGameStart: (gameStart: boolean) => void;
    endGame: boolean,
    setEndGame: (endGame: boolean) => void,
    countDown: boolean,
    setCountDown: (countDown: boolean) => void,
    rightChars: number;
    setRightChars: (rightChars: number) => void,
    wrongChars: number;
    setWrongChars: (wrongChars: number) => void,
    accuracy: number,
    setAccuracy: (accuracy: number) => void,
    errorPercentage: number,
    setErrorPercentage: (errorPercentage: number) => void,
    netwpm: number,
    setNetwpm: (netwpm: number) => void,
    cpm: number,
    setCpm: (cpm: number) => void,
    cursor: number,
    setCursor: (cursor: number) => void,
    setIncreaseCursor: () => void,
    setDecreaseCursor: () => void,
    setResetCursor: () => void,
}

export const useGameStateStore = create<GameState>((set) => ({
    isFocused: false,
    setFocused: (isFocused: boolean) => set({ isFocused }),
    gameStart: false,
    setGameStart: (gameStart: boolean) => set({ gameStart }),
    endGame: false,
    setEndGame: (endGame) => set({ endGame }),
    countDown: false,
    setCountDown: (countDown) => set({ countDown }),
    rightChars: 0,
    setRightChars: (rightChars: number) => set({ rightChars }),
    wrongChars: 0,
    setWrongChars: (wrongChars: number) => set({ wrongChars }),
    accuracy: 0,
    setAccuracy: (accuracy) => set({ accuracy }),
    errorPercentage: 0,
    setErrorPercentage: (errorPercentage) => set({ errorPercentage }),
    netwpm: 0,
    setNetwpm: (netwpm) => set({ netwpm }),
    cpm: 0,
    setCpm: (cpm) => set({ cpm }),
    cursor: 0,
    setCursor: (cursor) => set({ cursor }),
    setIncreaseCursor: () => set((state) => ({ cursor: state.cursor + 1})),
    setDecreaseCursor: () => set((state) => ({ cursor: state.cursor - 1})),
    setResetCursor: () => set({ cursor: 0 }),
}))