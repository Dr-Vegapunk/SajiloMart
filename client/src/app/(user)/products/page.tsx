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
import { Input } from "@/components/ui/input"

// This would typically come from your API
const getAllProducts = () => {
  // Sample products data
  return [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 128,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 95,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.2,
      reviews: 64,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 4,
      title: "Tablet Pro",
      price: 349.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 42,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 5,
      title: "Wireless Earbuds",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.4,
      reviews: 156,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 6,
      title: "Smart Home Hub",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.3,
      reviews: 78,
      category: { id: 1, name: "Electronics" },
    },
    {
      id: 7,
      title: "Casual T-Shirt",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.2,
      reviews: 87,
      category: { id: 2, name: "Fashion" },
    },
    {
      id: 8,
      title: "Denim Jeans",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 62,
      category: { id: 2, name: "Fashion" },
    },
    {
      id: 9,
      title: "Leather Wallet",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 45,
      category: { id: 2, name: "Fashion" },
    },
    {
      id: 10,
      title: "Sunglasses",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.1,
      reviews: 38,
      category: { id: 2, name: "Fashion" },
    },
    {
      id: 11,
      title: "Coffee Maker",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 112,
      category: { id: 3, name: "Home & Kitchen" },
    },
    {
      id: 12,
      title: "Blender",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.4,
      reviews: 76,
      category: { id: 3, name: "Home & Kitchen" },
    },
  ]
}

// Get all available categories from products
const getAllCategories = (products) => {
  const categoriesMap = products.reduce((acc, product) => {
    if (!acc[product.category.id]) {
      acc[product.category.id] = product.category
    }
    return acc
  }, {})

  return Object.values(categoriesMap)
}

export default function AllProductsPage() {
  const products = getAllProducts()
  const categories = getAllCategories(products)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">All Products</h1>
          <p className="text-gray-500 text-center mt-2 max-w-2xl mx-auto">
            Browse our complete collection of high-quality products across all categories
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mr-2">
              Showing <span className="font-medium text-black">{products.length}</span> products
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
                      <h3 className="text-sm font-medium mb-4">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox id={`category-${category.id}`} />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
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
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
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
                <div className="text-sm text-gray-500 mb-1">{product.category.name}</div>
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

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-rose-50 text-rose-600 border-rose-200">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              8
            </Button>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}

