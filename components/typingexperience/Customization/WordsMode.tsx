import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WholeWord } from "lucide-react"

export function WordsMode() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
            variant="texthighlight"
        >
            <WholeWord className="w-4 h-4"/>
            <span className="pl-2">words</span>
        </Button> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Oops!</DropdownMenuLabel>
        <DropdownMenuItem>This feature is currently pending</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};