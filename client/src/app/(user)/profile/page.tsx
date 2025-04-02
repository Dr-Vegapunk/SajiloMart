import Link from "next/link"
import Image from "next/image"
import { Package, Heart, CreditCard, User, LogOut, Settings, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  // Sample user data - would come from your API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.jpg?height=100&width=100",
  }

  // Sample order data
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      status: "Delivered",
      total: 329.97,
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "2023-03-28",
      status: "Processing",
      total: 124.99,
      items: 1,
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={user.avatar || "/placeholder.jpg"} alt={user.name} fill className="object-cover" />
                </div>
                <div>
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <CardDescription className="text-xs">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-100">
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  <Package className="h-4 w-4" />
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
                <Link
                  href="/profile/payment"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  <CreditCard className="h-4 w-4" />
                  Payment Methods
                </Link>
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <Link
                  href="/logout"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      <Image src={user.avatar || "/placeholder.jpg"} alt={user.name} fill className="object-cover" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{user.name}</h2>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentOrders.map((order) => (
                    <div key={order.id} className="py-3 border-b last:border-0">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm">{order.date}</div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="text-gray-500">{order.items} items</div>
                        <div>${order.total.toFixed(2)}</div>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Order updates</span>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="absolute h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Promotions and deals</span>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="absolute h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content (Desktop) */}
        <div className="space-y-8 md:space-y-6">
          <Card className="md:block">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image src={user.avatar || "/placeholder.jpg"} alt={user.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <Button className="mt-2">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                      <div>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

