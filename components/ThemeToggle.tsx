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

    if (!mounted) {
        // prevent rendering until the component has mounted
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {renderIcon()}
                    {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 lightblue:-rotate-0 lightblue:scale-100" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <Cigarette className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Citrus className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" /> */}
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
