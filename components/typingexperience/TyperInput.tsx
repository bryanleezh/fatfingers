"use client";

import { useSettingsStore } from "@/store/settings";
import { Input } from "../ui/input";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const textinput = "hi welcome to fat fingers";
    
    // TODO: Create custom caret
    const startCaret = () => {
        console.log("caret start");
    }

    // TODO: Add font theming
    // TODO: Add core typing module
    // TODO: Add smooth cursor to input
    // TODO: Add separate cursor with smooth logic
    // TODO: Add scoring logic
    return (
        <div className="flex flex-col items-center justify-center flex-grow">
            <div className="">
                <span className="text-primary leading-none">{textinput}</span>
            </div>
            <div className="">
                <Input 
                    type="text" 
                    onFocus={startCaret}
                    className="bg-background border-none text-primary caret-muted-foreground"
                />
            </div>
        </div>
    )
};