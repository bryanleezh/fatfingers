import { create } from "zustand";

type GameState = {
    isFocused: boolean;
    setFocused: (isFocused: boolean) => void;
    endGame: boolean,
    setEndGame: (endGame: boolean) => void,
    totalWords: number,
    setTotalWords: (totalWords: number) => void,
    totalCorrect: number,
    setTotalCorrect: (totalCorrect: number) => void,
    totalIncorrect: number,
    setTotalIncorrect: (totalIncorrect: number) => void,
    totalCharacters: number,
    setTotalCharacters: (totalCharacters: number) => void,
    totalCharactersCorrect: number,
    setTotalCharactersCorrect: (totalCharactersCorrect: number) => void,
    totalCharactersIncorrect: number,
    setTotalCharactersIncorrect: (totalCharactersIncorrect: number) => void,
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
    totalWords: 0,
    setTotalWords: (totalWords) => set({ totalWords }),
    totalCorrect: 0,
    setTotalCorrect: (totalCorrect) => set({ totalCorrect }),
    totalIncorrect: 0,
    setTotalIncorrect: (totalIncorrect) => set({ totalIncorrect }),
    totalCharacters: 0,
    setTotalCharacters: (totalCharacters) => set({ totalCharacters }),
    totalCharactersCorrect: 0,
    setTotalCharactersCorrect: (totalCharactersCorrect) => set({ totalCharactersCorrect }),
    totalCharactersIncorrect: 0,
    setTotalCharactersIncorrect: (totalCharactersIncorrect) => set({ totalCharactersIncorrect }),
    cursor: 0,
    setIncreaseCursor: () => set((state) => ({ cursor: state.cursor + 1})),
    setDecreaseCursor: () => set((state) => ({ cursor: state.cursor - 1})),
    setResetCursor: () => set({ cursor: 0 }),
}))