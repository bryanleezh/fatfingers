"use client";

import { Button } from "@/components/ui/button"
import { Timer, WholeWord } from "lucide-react"
import { Separator } from "../ui/separator"
import { useSettingsStore } from "@/store/settings"

export default function CustomizeBar() {
    const times: number[] = [15, 30, 60, 120];
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const setTime = useSettingsStore((state) => state.setTime);
    const setMode = useSettingsStore((state) => state.setMode);
    
    // TODO: Add logic to buttons for main typing settings
    const handleTimeChange = (newTime: number) => {
        setTime(newTime);
    }

    const handleModeChange = (newMode: 'time' | 'words') => {
        setMode(newMode);
    }

    return (
        <div className="flex items-center justify-center bg-accent rounded-lg px-10">
            <div className="flex items-center justify-center gap-4">
                <div>
                    <Button 
                        variant="texthighlight"
                        onClick={() => handleModeChange('time')}
                    >
                        <Timer className="w-4 h-4"/>
                        <span className="pl-2">time</span>
                    </Button>
                    <Button 
                        variant="texthighlight"
                        onClick={() => handleModeChange('words')}
                    >
                        <WholeWord className="w-4 h-4"/>
                        <span className="pl-2">words</span>
                    </Button>
                </div>
                <Separator orientation="vertical" className="h-6 w-0.5 bg-accent-foreground"/>
                <div>
                    {times.map((t) => (
                        <Button
                            key={t}
                            variant="texthighlight"
                            active={time === t}
                            onClick={() => handleTimeChange(t)}
                        >
                            {t}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
};