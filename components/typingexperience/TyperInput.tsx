"use client";

import { useSettingsStore } from "@/store/settings";
import { Input } from "../ui/input";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const textinput = "hi welcome to fat fingers";
    
    return (
        <div className="flex items-center justify-center">
            <span>{textinput}</span>
            <Input 
                type="text" 
                className="bg-background border-none"
            />
        </div>
    )
};