"use client"

import { useState, useEffect } from "react"
import { CategoryDialog } from "@/components/category-dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { toast } from 'react-toastify'
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

export default function CategoryDashboard() {
  const [categories, setCategories] = useState([])
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:9000/category");
      console.log("Categories fetched:", response.data);
      setCategories(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (values) => {
    try {
      const response = await axios.post("http://localhost:9000/category", values);
      const newCategory = {
        ...response.data,
        name: values.name.trim().toLowerCase(),
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCategories((prevCategories) => [...prevCategories, newCategory]);
      toast.success("Category added:", newCategory);
      return Promise.resolve(newCategory);
    } catch (error) {
      toast.error("Error adding category:", error);
      return Promise.reject(error);
    }
  };

  const handleEditCategory = async (values) => {
    try {
      const response = await axios.put(`http://localhost:9000/category/${categoryToEdit._id}`, values);
      const updatedCategories = categories.map((cat) => {
        if (cat._id === categoryToEdit._id) {
          return {
            ...cat,
            name: values.name.trim().toLowerCase(),
            updatedAt: new Date(),
          };
        }
        return cat;
      });

      setCategories(updatedCategories);
      setCategoryToEdit(null);
      toast.success("Category updated:", response?.data?.message);
      return Promise.resolve(values);
    } catch (error) {
      toast.error("Error updating category:", error);
      return Promise.reject(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await axios.delete(`http://localhost:9000/category/${categoryToDelete._id}`);

      const filteredCategories = categories.filter((cat) => cat._id !== categoryToDelete._id);

      setCategories(filteredCategories);
      setCategoryToDelete(null);
      setDeleteDialogOpen(false);
      toast.success(response?.data?.message);
      console.log("Category deleted:", categoryToDelete);
    } catch (error) {
      toast.error("Error deleting category:", error);
    }
  };

  const openEditDialog = (category) => {
    setCategoryToEdit(category)
  }

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Manage your categories - add, edit, or remove categories as needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Categories</h2>
            <CategoryDialog
              onSubmit={handleAddCategory}
              buttonText={
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Category
                </span>
              }
            />
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No categories yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody >
                  {categories.map((category) => (
                    <TableRow key={category?._id}>
                      <TableCell className="font-medium">{category?.name}</TableCell>
                      <TableCell>{formatDate(category?.createdAt)}</TableCell>
                      <TableCell>{formatDate(category?.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => openEditDialog(category)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => openDeleteDialog(category)}
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
        <CardFooter className="text-sm text-muted-foreground">Total categories: {categories.length}</CardFooter>
      </Card>

      {/* Edit Dialog */}
      {categoryToEdit && (
        <CategoryDialog
          initialValues={{ name: categoryToEdit.name }}
          onSubmit={handleEditCategory}
          buttonText="Edit Category"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category
              <span className="font-semibold"> {categoryToDelete?.name}</span>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
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