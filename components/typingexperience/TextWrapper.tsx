import { useSettingsStore } from "@/store/settings";
import { ScanEye } from "lucide-react";

type TextWrapperProps = {
  children: React.ReactNode;
};

export default function TextWrapper( {children}: TextWrapperProps ) {
    const isFocused = useSettingsStore((state) => state.isFocused); 
    const setFocused = useSettingsStore((state) => state.setFocused);

    const handleFocus = () => {
        setFocused(true);
        console.log('focused');
    };

    const handleBlur = () => {
        setFocused(false);
        console.log('Blurred');
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
                // onFocus={() => setFocused(true)}
                // onBlur={() => setFocused(false)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {children}
            </div>
        </>
    )
}