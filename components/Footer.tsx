
import { Github } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-4 py-6 md:px-6 md:py-8 w-full">
        <div className="flex items-center space-x-2">
            <Link
                className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/"
            >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
            </Link>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Bryan Lee
        </div>
    </footer>
  )
}