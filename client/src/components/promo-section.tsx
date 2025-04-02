import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PromoSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.jpg?height=400&width=600" alt="Special Offer" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700">
              Limited Time Offer
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Summer Sale</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Get up to 50% off on selected items. Hurry up, offer valid while stocks last!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

