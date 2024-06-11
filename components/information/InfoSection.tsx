import { CircleArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";

export default function InfoSection() {
    return (
        <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            Fat Fingers
                        </h1>
                        <p className="text-gray-500 md:text-xl dark:text-gray-400">
                            This project was built in:
                        </p>
                        <ul className="space-y-2 text-left">
                            <li>
                                <CircleArrowRight className="mr-2 inline-block h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <Link
                                    href="https://nextjs.org/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary"
                                >
                                    Next.js
                                </Link>
                            </li>
                            <li>
                                <CircleArrowRight className="mr-2 inline-block h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <Link
                                    href="https://www.typescriptlang.org/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary"
                                >
                                    TypeScript
                                </Link>
                            </li>
                            <li>
                                <CircleArrowRight className="mr-2 inline-block h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <Link
                                    href="https://www.partykit.io/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary"
                                >
                                    PartyKit
                                </Link>
                            </li>
                        </ul>
                        <div className="flex flex-col items-center gap-5 sm:space-x-4 space-y-2 sm:space-y-0">
                            <p className="text-primary text-xl dark:text-gray-400">
                                Want to contribute/add themes?
                            </p>
                            <Link
                                href="https://github.com/bryanleezh/fatfingers"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-muted px-8 text-sm font-medium text-gray-500 dark:text-gray-400 shadow transition-colors hover:bg-muted-foreground hover:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contribute
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
