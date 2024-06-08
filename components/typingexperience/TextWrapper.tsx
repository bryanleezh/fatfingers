import { useGameStateStore } from "@/store/gameState";
import { ScanEye } from "lucide-react";

type TextWrapperProps = {
  children: React.ReactNode;
  reset: () => void; 
};

export default function TextWrapper( {children, reset}: TextWrapperProps ) {
    const isFocused = useGameStateStore((state) => state.isFocused);
    const setFocused = useGameStateStore((state) => state.setFocused);
    const setGameStart = useGameStateStore((state) => state.setGameStart);

    const handleFocus = () => {
        setFocused(true);
    };

    // TODO: Reset game when blurred
    const handleBlur = () => {
        setFocused(false);
        setGameStart(false);
        reset();
    }

    return (
        <>
            <div 
                className={`${isFocused ? 'opacity-0' : 'opacity-100'} 
                flex items-center justify-center gap-3 transition-all duration-500`}
            >   
                <ScanEye className="text-center text-primary text-2xl"/>
                <span className="text-center font-mono text-lg text-primary">Focus to start typing</span>
            </div>
            <div 
                className={`relative mt-5 focus:border-0 focus:border-none focus:outline-none ${
                    isFocused ? 'blur-none' : 'cursor-pointer blur-md'
                }`}
                tabIndex={0}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {children}
            </div>
        </>
    )
}