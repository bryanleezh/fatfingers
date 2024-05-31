type consolidateResultsProps = {
    userInput: string;
    word: string;
    time: number;
}

export default function consolidateResults( {userInput, word, time} : consolidateResultsProps ) {
    // TODO: Add a way to calculate consistency
    const minutes: number = time / 60;
    const inputWordsnum: number = userInput.length / 5;
    const wpm: number = inputWordsnum / minutes;

    var rightChars: number = 0;
    
    for (let i=0; i < userInput.length ; i++) {
        if (userInput[i] === word[i]) {
            rightChars++;
        }
    };

    const accuracy: number = (rightChars / userInput.length) * 100;
    const errorPercentage: number = 100 - accuracy;
    const netwpm: number = Math.round(wpm / (accuracy / 100));
    const cpm: number = userInput.length / minutes;
    
    return {accuracy, errorPercentage, netwpm, cpm};
}