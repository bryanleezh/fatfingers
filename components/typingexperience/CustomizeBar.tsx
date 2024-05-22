import { Button } from "@/components/ui/button"
import { Timer, WholeWord } from "lucide-react"

export default function CustomizeBar() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-4">
                <Button variant="texthighlight">
                    <Timer className="w-4 h-4"/>
                    <span className="pl-2">time</span>
                </Button>
                <Button variant="texthighlight">
                    <WholeWord className="w-4 h-4"/>
                    <span className="pl-2">words</span>
                </Button>
                {/* TODO: Add line */}
                <Button variant="texthighlight" >15</Button>
                <Button variant="texthighlight">30</Button>
                <Button variant="texthighlight">60</Button>
                <Button variant="texthighlight">120</Button>
            </div>
        </div>
    )
};