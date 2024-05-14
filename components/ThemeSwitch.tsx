"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    function toggleTheme() {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    )
    return ( 
        <div className="flex items-center">
            <Sun className="pr-2 text-yellow-400" size={30} /> {/* Sun icon */}
            <Switch
                checked={resolvedTheme === 'dark'} // Set checked state based on current theme
                onCheckedChange={toggleTheme} // Toggle theme when switch is clicked
                aria-label="Toggle Light/Dark Theme"
            />
            <Moon className="pl-2 text-gray-400" size={30} /> {/* Moon icon */}
        </div>
    )

    // if (resolvedTheme === 'dark') {
    //     return <Moon onClick={() => setTheme('light')} />
    // }

    // if (resolvedTheme === 'light') {
    //     return <Sun onClick={() => setTheme('dark')} />
    // }
    
}