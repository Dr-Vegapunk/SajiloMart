"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

// Validation schema using Yup
const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: Yup.string().max(500, "Description must be less than 500 characters"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .typeError("Stock must be a number"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().of(Yup.string().url("Must be a valid URL")),
})

export function ProductDialog({
  initialValues = {
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  },
  categories = [],
  onSubmit,
  buttonText = "Add Product",
}) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values, actions) => {
    try {
      // Convert string values to numbers for price and stock
      const processedValues = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
      }

      await onSubmit(processedValues)
      actions.resetForm()
      setOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      actions.setStatus({ error: "Failed to save product. Please try again." })
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <Formik initialValues={initialValues} validationSchema={ProductSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, status, values, setFieldValue }) => (
            <Form>
              <DialogHeader>
                <DialogTitle>{initialValues.title ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {initialValues.title
                    ? "Update your product details below."
                    : "Create a new product by filling out the form below."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Title Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <div className="col-span-3">
                    <Field as={Input} id="title" name="title" placeholder="Enter product title" className="w-full" />
                    <ErrorMessage name="title" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {/* Description Field */}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <div className="col-span-3">
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Enter product description"
                      className="w-full min-h-[100px]"
                    />
                    <ErrorMessage name="description" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {/* Price Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <div className="col-span-3">
                    <Field
                      as={Input}
                      id="price"
                      name="price"
                      placeholder="0.00"
                      className="w-full"
                      type="number"
                      step="0.01"
                      min="0"
                    />
                    <ErrorMessage name="price" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {/* Stock Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <div className="col-span-3">
                    <Field
                      as={Input}
                      id="stock"
                      name="stock"
                      placeholder="0"
                      className="w-full"
                      type="number"
                      min="0"
                      step="1"
                    />
                    <ErrorMessage name="stock" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {/* Category Field */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <div className="col-span-3">
                    <Select value={values.category} onValueChange={(value) => setFieldValue("category", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.length === 0 ? (
                          <SelectItem value="" disabled>
                            No categories available
                          </SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <ErrorMessage name="category" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {/* Images Field */}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Images</Label>
                  <div className="col-span-3">
                    <FieldArray name="images">
                      {({ push, remove }) => (
                        <div className="space-y-2">
                          {values.images && values.images.length > 0 ? (
                            values.images.map((image, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Field as={Input} name={`images.${index}`} placeholder="Image URL" className="flex-1" />
                                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-muted-foreground">No images added yet.</div>
                          )}
                          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => push("")}>
                            <Plus className="h-4 w-4 mr-2" /> Add Image URL
                          </Button>
                          <ErrorMessage name="images" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                {status && status.error && <div className="text-red-500 text-sm">{status.error}</div>}
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

