import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best-selling products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product) => (
            <div key={product.id} className="flex items-center">
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-md">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.category}</p>
              </div>
              <div className="font-medium">${product.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View all products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

const topProducts = [
  {
    id: "1",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "89.99",
    image: "/placeholder.jpg?height=48&width=48",
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: "199.99",
    image: "/placeholder.jpg?height=48&width=48",
  },
  {
    id: "3",
    name: "Running Shoes",
    category: "Footwear",
    price: "129.99",
    image: "/placeholder.jpg?height=48&width=48",
  },
  {
    id: "4",
    name: "Backpack",
    category: "Accessories",
    price: "59.99",
    image: "/placeholder.jpg?height=48&width=48",
  },
]

