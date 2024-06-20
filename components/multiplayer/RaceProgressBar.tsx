// TODO: Add race progress bar for each racer

import { Bike } from "lucide-react";

type RaceProgressBarProps = {
  racers: {
    name: string;
    progress: number;
  }[];
};

export default function RaceProgressBar({ racers }: RaceProgressBarProps) {
    return (
        <div className="grid gap-6 w-full max-w-[50vw]">
            {racers.map((racer) => (
                <div key={racer.name} className="flex items-center gap-4">
                <span className="text-sm font-medium min-w-[50px]">{racer.name}</span>
                <div className="relative flex-1 h-6 bg-muted rounded-full">
                    <div
                        className={`absolute left-0 top-0 h-full bg-primary rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${racer.progress}%` }}
                    >
                    <Bike className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
                <span className="text-sm font-medium">{racer.progress}%</span>
                </div>
            ))}
        </div>
    );
}