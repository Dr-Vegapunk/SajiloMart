"use client"

import { useState } from "react"
import { ProductDialog } from "@/components/product-dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function ProductDashboard() {
  // For demo purposes, we'll use the same categories from the category dashboard
  const [categories, setCategories] = useState([
    { _id: "cat1", name: "electronics" },
    { _id: "cat2", name: "clothing" },
    { _id: "cat3", name: "books" },
  ])

  const [products, setProducts] = useState([])
  const [productToEdit, setProductToEdit] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleAddProduct = (values) => {
    // In a real app, you would call your API here
    const newProduct = {
      ...values,
      _id: Date.now().toString(),
      averageRating: 0,
      ratings: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProducts([...products, newProduct])
    console.log("Product added:", newProduct)
    return Promise.resolve(newProduct)
  }

  const handleEditProduct = (values) => {
    // In a real app, you would call your API here
    const updatedProducts = products.map((prod) => {
      if (prod._id === productToEdit._id) {
        return {
          ...prod,
          ...values,
          updatedAt: new Date(),
        }
      }
      return prod
    })

    setProducts(updatedProducts)
    setProductToEdit(null)
    console.log("Product updated:", values)
    return Promise.resolve(values)
  }

  const handleDeleteProduct = () => {
    if (!productToDelete) return

    // In a real app, you would call your API here
    const filteredProducts = products.filter((prod) => prod._id !== productToDelete._id)

    setProducts(filteredProducts)
    setProductToDelete(null)
    setDeleteDialogOpen(false)
    console.log("Product deleted:", productToDelete)
  }

  const openEditDialog = (product) => {
    setProductToEdit(product)
  }

  const openDeleteDialog = (product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId)
    return category ? category.name : "Unknown"
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your products - add, edit, or remove products as needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Products</h2>
            <ProductDialog
              categories={categories}
              onSubmit={handleAddProduct}
              buttonText={
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Product
                </span>
              }
            />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No products yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {product.title}
                        {product.images && product.images.length > 0 && (
                          <Badge variant="outline" className="ml-2">
                            {product.images.length} {product.images.length === 1 ? "image" : "images"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
                      </TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                          {product.stock > 0 ? product.stock : "Out of stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {product.averageRating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(product.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => openEditDialog(product)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => openDeleteDialog(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">Total products: {products.length}</CardFooter>
      </Card>

      {/* Edit Dialog */}
      {productToEdit && (
        <ProductDialog
          initialValues={{
            title: productToEdit.title,
            description: productToEdit.description || "",
            price: productToEdit.price,
            stock: productToEdit.stock,
            category: productToEdit.category,
            images: productToEdit.images || [],
          }}
          categories={categories}
          onSubmit={handleEditProduct}
          buttonText="Edit Product"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product
              <span className="font-semibold"> {productToDelete?.title}</span>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

