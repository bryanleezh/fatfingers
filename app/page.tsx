import Typer from "@/components/typingexperience/Typer";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-4 px-12">
      <span id="hidden-measure" className="font-mono text-2xl break-all opacity-0 h-0">a</span>
      <Typer />  
    </main>
  );
}
