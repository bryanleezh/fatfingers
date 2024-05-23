import { Button } from "@/components/ui/button"
import { Timer, WholeWord } from "lucide-react"
import { Separator } from "../ui/separator"

export default function CustomizeBar() {
    // TODO: Add logic to buttons for main typing settings
    // * propagate the functions to the parent component or use Zustand
    return (
        <div className="flex items-center justify-center bg-accent rounded-lg px-10">
            <div className="flex items-center justify-center gap-4">
                <div>
                    <Button variant="texthighlight">
                        <Timer className="w-4 h-4"/>
                        <span className="pl-2">time</span>
                    </Button>
                    <Button variant="texthighlight">
                        <WholeWord className="w-4 h-4"/>
                        <span className="pl-2">words</span>
                    </Button>
                </div>
                <Separator orientation="vertical" className="h-6 w-0.5 bg-accent-foreground"/>
                <div>
                    <Button variant="texthighlight">15</Button>
                    <Button variant="texthighlight">30</Button>
                    <Button variant="texthighlight">60</Button>
                    <Button variant="texthighlight">120</Button>
                </div>
            </div>
        </div>
    )
};