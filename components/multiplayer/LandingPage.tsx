import { Link } from "next-view-transitions"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Multiplayer Mayhem</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience the ultimate multiplayer showdown in our latest game. Gather up to 3 friends and get ready for
                  intense battles to see who is faster!
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <Input type="text" placeholder="Enter room code" className="max-w-[200px]" />
                  <Button>Join Room</Button>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Create Room
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              alt="Multiplayer Mayhem"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
    </div>
  )
}