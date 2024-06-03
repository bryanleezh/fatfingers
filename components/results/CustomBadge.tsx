import { Badge } from "../ui/badge"

type CustomBadgeProps = {
    sign: "positive" | "negative" | "neutral";
    amount: number;
}

export default function CustomBadge( {sign, amount} : CustomBadgeProps) {
    if (sign === "positive") {
        return (
            <Badge
                variant="outline"
                className="border-green-600 bg-muted dark:bg-gray-950 px-2 py-1 text-xs font-small text-green-600 dark:text-green-400"
            >
                +{amount.toString()}%
            </Badge>
        )
    } else if (sign === "negative") {
        return (
            <Badge
                variant="outline"
                className="border-red-600 bg-muted dark:bg-gray-950 px-2 py-1 text-xs font-small text-red-600 dark:text-red-400"
            >
                -{amount.toString()}%
            </Badge>
        )
    } else {
        return (
            <Badge
                variant="outline"
                className="border-gray-500 bg-muted dark:bg-gray-950 px-2 py-1 text-xs font-small text-gray-500 dark:text-gray-500"
            >
                {amount.toString()}%
            </Badge>
        )
    }
}