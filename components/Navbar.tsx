import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { CircleUserRound, Info, Keyboard, Settings } from "lucide-react";
import ThemeToggles from "./ThemeToggle";
import fatlogo from "@/public/fat-fingers-icon.png"
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between py-12 md:px-6">
        <Link className="flex items-center gap-2" href="/">
            <Image src={fatlogo} alt="logo" className="h-12 w-12"/>
            <span className="font-semibold">Fat Fingers</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
            <Link className="inline-flex h-10 w-10 items-center justify-center rounded-full" href="/">
                <Keyboard className="h-5 w-5" />
                <span className="sr-only">Keyboard</span>
            </Link>
            <Link className="inline-flex h-10 w-10 items-center justify-center rounded-full" href="/info">
                <Info className="h-5 w-5" />
                <span className="sr-only">Information</span>
            </Link>
            <ThemeToggles />
            <Link className="inline-flex h-10 w-10 items-center justify-center rounded-full" href="settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" size="icon" variant="ghost">
                        <CircleUserRound className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href="#">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="#">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href="#">Logout</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  )
}