"use client"

import { useEffect, useState } from "react"
import { BarChart, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue overview</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Monthly revenue overview</CardDescription>
        </div>
        <Tabs defaultValue="bar" className="ml-auto">
          <TabsList className="grid grid-cols-2 h-8">
            <TabsTrigger value="bar" className="h-8 w-8 p-0">
              <BarChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="line" className="h-8 w-8 p-0">
              <LineChart className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <img
            src="/placeholder.svg?height=300&width=600"
            alt="Revenue Chart"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  )
}

