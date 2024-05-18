"use client"

import * as React from "react"
import { Sun, Moon, Cigarette, Citrus } from "lucide-react";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggles() {
    const { theme, setTheme, themes } = useTheme();
    const [ mounted, setMounted ] = React.useState(false);

    // TODO: Swap icons to words
    const renderIcon = () => {
        switch (theme) {
            case 'dark':
                return <Moon className="h-[1.2rem] w-[1.2rem]" />;
            case 'light':
                return <Sun className="h-[1.2rem] w-[1.2rem]" />;
            case 'lightblue':
                return <Cigarette className="h-[1.2rem] w-[1.2rem]" />;
            case 'darkblue':
                return <Citrus className="h-[1.2rem] w-[1.2rem]" />;
            default:
                return <Sun className="h-[1.2rem] w-[1.2rem]" />;
        }
    };

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // prevent rendering until the component has mounted
    if (!mounted) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {renderIcon()}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map(theme => (
                    <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                        {theme}
                    </DropdownMenuItem>    
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
