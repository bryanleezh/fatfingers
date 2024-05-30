"use client";

import { useSettingsStore } from "@/store/settings";
import TextWrapper from "./TextWrapper";
import TextContainer from "./TextContainer";
import Input from "./Input";
import ResetGame from "./ResetGame";
import { useGameStateStore } from "@/store/gameState";
import useKeyPressListener from "@/hooks/useKeyPressListener";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const resetKey = useSettingsStore((state) => state.resetKey);
    const setResetKey = useSettingsStore((state) => state.setResetKey);
    const isFocused = useGameStateStore((state) => state.isFocused);
    
    const textinput = "provided pish aboard without helpless crisp and exactly escalator yippee behind ack vector misconceive unabashedly per steep once gadzooks sight mmm throughout longingly vice appropriate versus desire plastic hm eek";
    const userInput = "provided pisk aboard hello";
        
    
    
    // TODO: Create custom caret
    // TODO: Add reset game state
    const resetGame = () => {
        console.log("game reset");
    };

    // Listener for keyboard events
    useKeyPressListener({ isFocused, resetKey });


    // TODO: Add font theming
    // TODO: Add core typing module
    // TODO: Add smooth cursor to input
    // TODO: Add separate cursor with smooth logic
    // TODO: Add scoring logic
    return (
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center max-w-5xl gap-4 px-4 xl:px-0">
            <TextWrapper>
                <TextContainer word={textinput}/>
                <Input userInput={userInput} word={textinput} />
                <ResetGame reset={resetGame} />
            </TextWrapper>
        </div>
    )
};