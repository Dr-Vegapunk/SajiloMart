"use client"

import { AdminLayout } from "@/components/admin-layout"
import { DashboardCards } from "@/components/dashboard-cards"
import { RecentOrders } from "@/components/recent-orders"
import { RevenueChart } from "@/components/revenue-chart"
import { TopProducts } from "@/components/top-products"

export function DashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DashboardCards />
        <div className="grid gap-5 md:grid-cols-2">
          <RevenueChart />
          <TopProducts />
        </div>
        <RecentOrders />
      </div>
    </AdminLayout>
  )
}

