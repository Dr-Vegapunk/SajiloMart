import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to SajiloMart
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Your one-stop destination for all your shopping needs. Discover amazing products at unbeatable prices.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Shop Now
              </Button>
              <Button size="lg" variant="outline">
                Explore Categories
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] w-full">
            <Image
              src="/placeholder.jpg?height=600&width=800"
              alt="SajiloMart Hero"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

