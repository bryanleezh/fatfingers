import { useGameStateStore } from "@/store/gameState";
import { useSettingsStore } from "@/store/settings";
import consolidateResults from "@/utils/consolidateResults";

type MainResultsProps = {
    userInput: string;
    word: string;
}

export default function MainResults( { userInput, word } : MainResultsProps ) {
    const time = useSettingsStore((state) => state.time);
    
    // Previous results
    const prevAccuracy = useGameStateStore((state) => state.accuracy); 
    const prevErrorPercentage = useGameStateStore((state) => state.errorPercentage); 
    const prevNetwpm = useGameStateStore((state) => state.netwpm); 
    const prevCpm = useGameStateStore((state) => state.cpm);
    const setAccuracy = useGameStateStore((state) => state.setAccuracy);
    const setErrorPercentage = useGameStateStore((state) => state.setErrorPercentage);
    const setNetwpm = useGameStateStore((state) => state.setNetwpm);
    const setCpm = useGameStateStore((state) => state.setCpm);
    
    // New results
    const { accuracy, errorPercentage, netwpm, cpm } = consolidateResults({userInput, word, time});
    
    return (
        <>
            Results
        </>
    )
}