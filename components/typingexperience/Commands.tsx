"use client";

import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    ListRestart,
    Smile,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group";
import { useSettingsStore } from "@/store/settings";

export default function Commands() {
    const [open, setOpen] = React.useState(false);
    const resetKey = useSettingsStore((state) => state.resetKey);
    const setResetKey = useSettingsStore((state) => state.setResetKey);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    // TODO: Add other settings
    return (
        <div className="flex flex-col text-center">
            <p className="text-sm text-muted-foreground pb-3">
                Restart -{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">{resetKey}</span>
                </kbd>
            </p>
            <p className="text-sm text-muted-foreground">
                Settings -{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>J
                </kbd>
                ,
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Ctrl</span>J
                </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile className="mr-2 h-4 w-4" />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <ListRestart className="mr-2 h-4 w-4" />
                            <span>Restart key</span>
                            <CommandShortcut>
                                <ToggleGroup size="sm" type="single">
                                    <ToggleGroupItem value="enter" aria-label="Toggle enter" onClick={() => setResetKey("Enter")}>
                                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                            <span className="text-xs">Enter</span>
                                        </kbd>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="tab" aria-label="Toggle tab" onClick={() => setResetKey("Tab")}>
                                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                        <span className="text-xs">Tab</span>
                                    </kbd>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="esc" aria-label="Toggle esc" onClick={() => setResetKey("Escape")}>
                                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                            <span className="text-xs">Esc</span>
                                        </kbd>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="none" aria-label="Toggle none" onClick={() => setResetKey("")}>
                                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                            <span className="text-xs">None</span>
                                        </kbd>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}
