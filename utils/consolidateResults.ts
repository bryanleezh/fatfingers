type consolidateResultsProps = {
    userInput: string;
    para: string;
    time: number;
}

export default function consolidateResults( {userInput, para, time} : consolidateResultsProps ) {
    // TODO: Add a way to calculate consistency
    const minutes: number = time / 60;
    const inputWordsnum: number = userInput.length / 5;
    const wpm: number = inputWordsnum / minutes;

    var rightChars: number = 0;
    
    for (let i=0; i < userInput.length ; i++) {
        if (userInput[i] === para[i]) {
            rightChars++;
        }
    };

    const accuracy: number = parseFloat(((rightChars / userInput.length) * 100).toFixed(1));
    const errorPercentage: number = parseFloat((100 - accuracy).toFixed(1));
    const netwpm: number = Math.round(wpm / (accuracy / 100));
    const cpm: number = userInput.length / minutes;
    const wrongChars: number = userInput.length - rightChars;
    
    return {accuracy, errorPercentage, netwpm, cpm, rightChars, wrongChars};
}