"use client";

import { Button } from "@/components/ui/button"
import { Timer, WholeWord } from "lucide-react"
import { Separator } from "../../ui/separator"
import { useSettingsStore } from "@/store/settings"
import { WordsMode } from "./WordsMode";

export default function CustomizeBar() {
    const times: number[] = [15, 30, 60, 120];
    const words: number[] = [15, 30, 60, 120];
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const setTime = useSettingsStore((state) => state.setTime);
    const setMode = useSettingsStore((state) => state.setMode);
    
    const handleTimeChange = (newTime: number) => {
        setTime(newTime);
    }

    const handleModeChange = (newMode: 'time' | 'words') => {
        setMode(newMode);
    }

    return (
        <div className="flex items-center justify-center bg-accent rounded-lg mx-auto">
            <div className="flex items-center justify-center gap-4">
                <div>
                    <Button 
                        variant="texthighlight"
                        active={mode === 'time'}
                        onClick={() => handleModeChange('time')}
                    >
                        <Timer className="w-4 h-4"/>
                        <span className="pl-2">time</span>
                    </Button>
                    <WordsMode />
                    {/* <Button 
                        variant="texthighlight"
                        active={mode === 'words'}
                        onClick={() => handleModeChange('words')}
                    >
                        <WholeWord className="w-4 h-4"/>
                        <span className="pl-2">words</span>
                    </Button> */}
                </div>
                <Separator orientation="vertical" className="h-6 w-0.5 bg-muted-foreground"/>
                {mode === "time" && 
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
                }
                {/* {mode === "words" &&
                    <div>
                        {words.map((t) => (
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
                } */}
            </div>
        </div>
    )
};