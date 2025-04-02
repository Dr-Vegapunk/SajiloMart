"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Menu, ChevronDown, ChevronRight, Home, ShoppingBag, Heart, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Category = {
  id: number
  name: string
  subcategories?: { id: number; name: string }[]
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isOpen) {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Sample categories - replace with actual data from your API
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        { id: 101, name: "Smartphones" },
        { id: 102, name: "Laptops" },
        { id: 103, name: "Audio" },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      subcategories: [
        { id: 201, name: "Men's Clothing" },
        { id: 202, name: "Women's Clothing" },
        { id: 203, name: "Accessories" },
      ],
    },
    {
      id: 3,
      name: "Home & Kitchen",
      subcategories: [
        { id: 301, name: "Appliances" },
        { id: 302, name: "Furniture" },
        { id: 303, name: "Kitchenware" },
      ],
    },
    { id: 4, name: "Beauty" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Books" },
  ]

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        id="sidebar-toggle"
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:h-auto lg:shadow-none lg:z-0",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="font-bold text-xl">SajiloMart</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>All Products</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>My Account</span>
            </Link>
          </nav>

          <div className="mt-6">
            <h3 className="font-medium text-sm uppercase text-gray-500 mb-2 px-2">Categories</h3>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  {category.subcategories ? (
                    <div className="space-y-1">
                      <button
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {expandedCategories.includes(category.id) && category.subcategories && (
                        <ul className="pl-4 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                              <Link
                                href={`/category/${category.id}/${subcategory.id}`}
                                className="block p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={`/category/${category.id}`}
                      className="block p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t pt-4">
            <Link
              href="/help"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

