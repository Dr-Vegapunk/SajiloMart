import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  // Sample cart data - would come from your API
  const cartItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129.99,
      image: "/placeholder.jpg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      image: "/placeholder.jpg?height=100&width=100",
      quantity: 2,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10.0
  const total = subtotal + shipping

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                <Separator className="mb-6" />

                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.jpg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="md:hidden mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <div className="hidden md:block">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          readOnly
                        />
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-rose-600 hover:bg-rose-700">Proceed to Checkout</Button>
              <div className="mt-4 text-center">
                <Link href="/products" className="text-sm text-rose-600 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products">
            <Button className="bg-rose-600 hover:bg-rose-700">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

