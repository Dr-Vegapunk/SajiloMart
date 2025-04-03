import Link from "next/link"
import Image from "next/image"
import { Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

// This would typically come from your API based on the category ID
const getCategoryData = (id: string) => {
  const categories = {
    "1": {
      id: 1,
      name: "Electronics",
      description: "Discover the latest electronic gadgets and devices for your everyday needs.",
      image: "/placeholder.jpg?height=400&width=1200",
      products: [
        {
          id: 1,
          title: "Wireless Headphones",
          price: 129.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.5,
          reviews: 128,
        },
        {
          id: 2,
          title: "Smart Watch",
          price: 199.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.8,
          reviews: 95,
        },
        {
          id: 3,
          title: "Bluetooth Speaker",
          price: 79.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.2,
          reviews: 64,
        },
        {
          id: 4,
          title: "Tablet Pro",
          price: 349.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.7,
          reviews: 42,
        },
        {
          id: 5,
          title: "Wireless Earbuds",
          price: 89.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.4,
          reviews: 156,
        },
        {
          id: 6,
          title: "Smart Home Hub",
          price: 129.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.3,
          reviews: 78,
        },
      ],
    },
    "2": {
      id: 2,
      name: "Fashion",
      description: "Explore trendy clothing and accessories for all seasons.",
      image: "/placeholder.jpg?height=400&width=1200",
      products: [
        {
          id: 7,
          title: "Casual T-Shirt",
          price: 24.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.2,
          reviews: 87,
        },
        {
          id: 8,
          title: "Denim Jeans",
          price: 49.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.5,
          reviews: 62,
        },
        {
          id: 9,
          title: "Leather Wallet",
          price: 34.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.7,
          reviews: 45,
        },
        {
          id: 10,
          title: "Sunglasses",
          price: 19.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.1,
          reviews: 38,
        },
      ],
    },
    "3": {
      id: 3,
      name: "Home & Kitchen",
      description: "Find everything you need to make your house a home.",
      image: "/placeholder.jpg?height=400&width=1200",
      products: [
        {
          id: 11,
          title: "Coffee Maker",
          price: 89.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.7,
          reviews: 112,
        },
        {
          id: 12,
          title: "Blender",
          price: 59.99,
          image: "/placeholder.jpg?height=400&width=400",
          rating: 4.4,
          reviews: 76,
        },
      ],
    },
  }

  return categories[id as keyof typeof categories] || null
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = getCategoryData(params.id)

  if (!category) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button className="bg-rose-600 hover:bg-rose-700">Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Category Hero */}
      <div className="relative h-[200px] md:h-[300px]">
        <Image
          src={category.image || "/placeholder.jpg"}
          alt={category.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{category.name}</h1>
            <p className="max-w-2xl mx-auto">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mr-2">
              Showing <span className="font-medium text-black">{category.products.length}</span> products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down products to find exactly what you're looking for.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Price Range</h3>
                      <Slider defaultValue={[0, 500]} max={1000} step={10} />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">$0</span>
                        <span className="text-sm">$1000</span>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium mb-4">Brand</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-1" />
                          <label
                            htmlFor="brand-1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Apple
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-2" />
                          <label
                            htmlFor="brand-2"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Samsung
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-3" />
                          <label
                            htmlFor="brand-3"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sony
                          </label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium mb-4">Rating</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rating-4" />
                          <label
                            htmlFor="rating-4"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                          >
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rating-3" />
                          <label
                            htmlFor="rating-3"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                          >
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-gray-300" />
                              ))}
                            </div>
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <div className="hidden sm:block">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Dropdown */}
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">{category.name}</div>
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
                  <span className="text-sm text-gray-500 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

