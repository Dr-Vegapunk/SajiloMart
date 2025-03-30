import { ArrowDown, ArrowUp, CreditCard, DollarSign, Package, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              12.5%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              5.2%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,245</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              8.1%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className={cn("flex items-center", "text-rose-500")}>
              <ArrowDown className="mr-1 h-3 w-3" />
              2.1%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

