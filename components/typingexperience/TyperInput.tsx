"use client";

import { useSettingsStore } from "@/store/settings";
import { Input } from "../ui/input";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const textinput = "hi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingers hi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingers hi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingers hi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingershi welcome to fat fingers";
    // const textinput = "hi welcome to fat fingers";
    
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
        <div className="w-screen max-w-screen-xl mx-auto relative h-1/2">
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary text-2xl leading-none text-justify">{textinput}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Input 
                    type="text"
                    onFocus={startCaret}
                    className="bg-transparent border-none text-primary text-2xl caret-muted-foreground w-full h-full"
                    // style={{ height: '100%'}}
                />
            </div>
        </div>
    )
};