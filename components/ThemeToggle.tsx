"use client";

import * as React from "react"
import { Palette } from "lucide-react";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggles() {
    const [ mounted, setMounted ] = React.useState(false);
    const { setTheme, themes } = useTheme();

    // can remove to prevent slow loading
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
                <Button className="rounded-full" variant="ghost" size="icon">
                    <Palette className="h-5 w-5"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map((themeOption) => (
                    <DropdownMenuItem key={themeOption} onClick={() => setTheme(themeOption)}>
                        {themeOption}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
