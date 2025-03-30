"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Plus, Pencil, Trash2, Filter, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import ProductForm from "@/components/product-form"
import toast from "react-hot-toast"

// Update the Product interface to match the Mongoose schema
interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  category: Category // This will store the category ID
  images: string[]
  averageRating: number
}

// Update the Category interface if needed
interface Category {
  id: string // Changed to string since it's a MongoDB ObjectId
  name: string
}

interface ProductFormData {
  title: string
  description: string
  price: string
  stock: string
  category: string //category ID reference to the category model
  images: string[]
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:9000/products")
      setProducts(response.data)
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:9000/category")
      setCategories(response.data.data)
    } catch (error) {
      toast.error("Failed to fetch categories")
    }
  }

  // Update the handleAddProduct function
  const handleAddProduct = async (formData: ProductFormData) => {
    try {
      setIsSubmitting(true)
      await axios.post("http://localhost:9000/products", {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        images: formData.images,
      })
      toast.success("Product added successfully")
      setIsAddDialogOpen(false)
      fetchProducts()
    } catch (error) {
      toast.error("Failed to add product")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update the handleEditProduct function
  const handleEditProduct = async (formData: ProductFormData) => {
    if (!currentProduct) return

    try {
      setIsSubmitting(true)
      await axios.put(`http://localhost:9000/products/${currentProduct.id}`, {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        images: formData.images,
      })
      toast.success("Product updated successfully")
      setIsEditDialogOpen(false)
      fetchProducts()
    } catch (error) {
      toast.error("Failed to update product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!currentProduct) return

    try {
      await axios.delete(`http://localhost:9000/products/${currentProduct.id}`)
      toast.success("Product deleted successfully")
      setIsDeleteDialogOpen(false)
      fetchProducts()
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }

  // Update the openEditDialog function
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const toggleCategoryFilter = (categoryName: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  const filteredProducts = selectedCategories.length
  ? products.filter((product) =>
      selectedCategories.includes(product?.category?.name)
    )
  : products;
  
 

  // Prepare form data for editing
  const getEditFormData = (): ProductFormData | undefined => {
    if (!currentProduct) return undefined

    return {
      title: currentProduct.title,
      description: currentProduct.description,
      price: currentProduct.price.toString(),
      stock: currentProduct.stock.toString(),
      category: currentProduct.category,
      images: currentProduct.images || [],
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your products: add, edit, delete, and filter by category.</CardDescription>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategoryFilter(category.name)}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              {/* Update the table header and rows */}
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.category ? product.category.name : "Unknown"}</TableCell>
                      <TableCell>{product.averageRating.toFixed(1)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(product)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details for the new product.</DialogDescription>
          </DialogHeader>
          <ProductForm
            categories={categories}
            onSubmit={handleAddProduct}
            onCancel={() => setIsAddDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product details.</DialogDescription>
          </DialogHeader>
          <ProductForm
            initialData={getEditFormData()}
            categories={categories}
            onSubmit={handleEditProduct}
            onCancel={() => setIsEditDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentProduct?.title}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

