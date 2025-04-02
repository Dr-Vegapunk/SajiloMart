import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WishlistPage() {
  // Sample wishlist data - would come from your API
  const wishlistItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.jpg?height=300&width=300",
      inStock: true,
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      image: "/placeholder.jpg?height=300&width=300",
      inStock: true,
    },
    {
      id: 3,
      title: "Casual T-Shirt",
      price: 24.99,
      image: "/placeholder.jpg?height=300&width=300",
      inStock: false,
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-0 shadow-sm">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
                <Link href={`/products/${item.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
              </div>
              <CardContent className="p-4">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                </Link>
                <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
                <div className="mt-4">
                  {item.inStock ? (
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist and find them here anytime.</p>
          <Link href="/products">
            <Button className="bg-rose-600 hover:bg-rose-700">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

