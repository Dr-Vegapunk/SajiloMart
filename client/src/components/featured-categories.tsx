import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedCategories() {
  // This would typically come from your API
  const categories = [
    { id: 1, name: "Electronics", image: "/placeholder.jpg?height=300&width=300" },
    { id: 2, name: "Fashion", image: "/placeholder.jpg?height=300&width=300" },
    { id: 3, name: "Home & Kitchen", image: "/placeholder.jpg?height=300&width=300" },
    { id: 4, name: "Beauty", image: "/placeholder.jpg?height=300&width=300" },
    { id: 5, name: "Sports", image: "/placeholder.jpg?height=300&width=300" },
    { id: 6, name: "Books", image: "/placeholder.jpg?height=300&width=300" },
  ]

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our wide selection of categories and find exactly what you need
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="group">
              <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.jpg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

