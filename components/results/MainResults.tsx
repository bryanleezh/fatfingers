import { useGameStateStore } from "@/store/gameState";
import { useSettingsStore } from "@/store/settings";
import consolidateResults from "@/utils/consolidateResults";
import { Card } from "../ui/card";
import CustomBadge from "./CustomBadge";
import ResetGame from "../typingexperience/ResetGame";

type MainResultsProps = {
    userInput: string;
    para: string;
    onRestartGame: () => void;
}

export default function MainResults({ userInput, para, onRestartGame }: MainResultsProps) {
    const time = useSettingsStore((state) => state.time);

    // Previous results
    const prevRightChars = useGameStateStore((state) => state.rightChars);
    const prevWrongChars = useGameStateStore((state) => state.wrongChars)
    const prevAccuracy = useGameStateStore((state) => state.accuracy); 
    const prevErrorPercentage = useGameStateStore((state) => state.errorPercentage); 
    const prevNetwpm = useGameStateStore((state) => state.netwpm); 
    const prevCpm = useGameStateStore((state) => state.cpm);
    const setRightChars = useGameStateStore((state) => state.setRightChars);
    const setWrongChars = useGameStateStore((state) => state.setWrongChars);
    const setAccuracy = useGameStateStore((state) => state.setAccuracy);
    const setErrorPercentage = useGameStateStore((state) => state.setErrorPercentage);
    const setNetwpm = useGameStateStore((state) => state.setNetwpm);
    const setCpm = useGameStateStore((state) => state.setCpm);
    
    // New results
    const { accuracy, errorPercentage, netwpm, cpm, rightChars, wrongChars } = consolidateResults({ userInput, para, time });
    
    // Ensure all values are valid numbers
    const validPrevNetwpm = !isNaN(prevNetwpm) ? prevNetwpm : 0;
    const validPrevCpm = !isNaN(prevCpm) ? prevCpm : 0;
    const validPrevRightChars = !isNaN(prevRightChars) ? prevRightChars : 0;
    const validPrevWrongChars = !isNaN(prevWrongChars) ? prevWrongChars : 0;
    const validPrevAccuracy = !isNaN(prevAccuracy) ? prevAccuracy : 0;
    const validPrevErrorPercentage = !isNaN(prevErrorPercentage) ? prevErrorPercentage : 0;
    
    const validNetwpm = !isNaN(netwpm) ? netwpm : 0;
    const validCpm = !isNaN(cpm) ? cpm : 0;
    const validRightChars = !isNaN(rightChars) ? rightChars : 0;
    const validWrongChars = !isNaN(wrongChars) ? wrongChars : 0;
    const validAccuracy = !isNaN(accuracy) ? accuracy : 0;
    const validErrorPercentage = !isNaN(errorPercentage) ? errorPercentage : 0;
    
    // Returns the amount used in CustomBadge component
    const compareAmount = (prevAmount: number, newAmount: number) => {
        return parseFloat(Math.abs(prevAmount - newAmount).toFixed(1));
    };

    // Returns positive/negative/neutral used in CustomBadge component
    const compareSign = (prevAmount: number, newAmount: number) => {
        if (prevAmount > newAmount) {
            return "negative";
        } else if (prevAmount < newAmount) {
            return "positive";
        } else {
            return "neutral";
        }
    };

    // sets all stats into state
    const setAllStats = () => {
        setRightChars(rightChars);
        setWrongChars(wrongChars);
        setAccuracy(accuracy);
        setErrorPercentage(errorPercentage);
        setNetwpm(netwpm);
        setCpm(cpm);
    }

    // TODO: Add all new results into state to store for use for the next result
    const restartGame = () => {
        onRestartGame();
        setAllStats();
    }

    return (
        <Card className="bg-card p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
            <div className="flex justify-center items-center mb-4">
                <span className="font-mono text-xl">Results</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">wpm</div>
                    <div className="text-xl font-mono font-bold">{validNetwpm}</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 dark:text-gray-500">{validPrevNetwpm}</span>
                        <CustomBadge sign={compareSign(validPrevNetwpm, validNetwpm)} amount={compareAmount(validPrevNetwpm, validNetwpm)} />
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">cpm</div>
                    <div className="text-xl font-mono font-bold">{validCpm}</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 dark:text-gray-500">{validPrevCpm}</span>
                        <CustomBadge sign={compareSign(validPrevCpm, validCpm)} amount={compareAmount(validPrevCpm, validCpm)} />
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">character</div>
                    <div className="text-xl font-mono font-bold">{validRightChars} / {validWrongChars}</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 dark:text-gray-500">{validPrevRightChars} / {validPrevWrongChars}</span>
                        <CustomBadge sign={compareSign(validPrevRightChars, validRightChars)} amount={compareAmount(validPrevRightChars, validRightChars)} />
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">time</div>
                    <div className="text-xl font-mono font-bold">{time}s</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">accuracy</div>
                    <div className="text-xl font-mono font-bold">{validAccuracy}%</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 dark:text-gray-500">{validPrevAccuracy}%</span>
                        <CustomBadge sign={compareSign(validPrevAccuracy, validAccuracy)} amount={compareAmount(validPrevAccuracy, validAccuracy)} />
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="text-gray-500 dark:text-gray-400 mb-1 font-mono">error</div>
                    <div className="text-xl font-mono font-bold">{validErrorPercentage}%</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 dark:text-gray-500">{validPrevErrorPercentage}%</span>
                        <CustomBadge sign={compareSign(validPrevErrorPercentage, validErrorPercentage)} amount={compareAmount(validPrevErrorPercentage, validErrorPercentage)} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <ResetGame reset={restartGame} />
            </div>
        </Card>
    )
}
