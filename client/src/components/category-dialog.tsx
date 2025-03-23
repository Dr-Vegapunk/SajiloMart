"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
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

// Validation schema using Yup
const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
})

export function CategoryDialog({ initialValues = { name: "" }, onSubmit, buttonText = "Add Category" }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values, actions) => {
    try {
      await onSubmit(values)
      actions.resetForm()
      setOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      actions.setStatus({ error: "Failed to save category. Please try again." })
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Formik initialValues={initialValues} validationSchema={CategorySchema} onSubmit={handleSubmit}>
          {({ isSubmitting, status }) => (
            <Form>
              <DialogHeader>
                <DialogTitle>{initialValues.name ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogDescription>
                  {initialValues.name
                    ? "Update your category details below."
                    : "Create a new category by entering a name below."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <div className="col-span-3">
                    <Field as={Input} id="name" name="name" placeholder="Enter category name" className="w-full" />
                    <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                {status && status.error && <div className="text-red-500 text-sm">{status.error}</div>}
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Category"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

