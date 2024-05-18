import ThemeToggles from "@/components/ThemeToggle";
import { Link } from "next-view-transitions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* TODO: Add navbar */}
      <ThemeToggles />
      <h2>
        <span className='settings'>Settings</span>
      </h2>
      <Link href='settings'>Go to settings</Link>
    </main>
  );
}
