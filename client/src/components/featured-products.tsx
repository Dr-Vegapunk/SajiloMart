import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedProducts() {
  // This would typically come from your API
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      category: "Electronics",
    },
    {
      id: 3,
      title: "Casual T-Shirt",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.2,
      category: "Fashion",
    },
    {
      id: 4,
      title: "Coffee Maker",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      category: "Home & Kitchen",
    },
  ]

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our handpicked selection of top products
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                <Link href={`/products/${product.id}`} className="hover:underline">
                  <h3 className="font-medium line-clamp-1">{product.title}</h3>
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                </div>
                <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

