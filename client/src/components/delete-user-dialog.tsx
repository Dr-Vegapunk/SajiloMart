"use client"

import { useState } from "react"
import axios from "axios"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
}

interface DeleteUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserDeleted: (userId: string) => void
}

export default function DeleteUserDialog({ user, open, onOpenChange, onUserDeleted }: DeleteUserDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  // Update the handleDelete function to handle network errors
  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      // Check if we're using mock data
      if (user._id.startsWith("mock")) {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 500))
        onUserDeleted(user._id)
        onOpenChange(false)
        return
      }

      await axios.delete(`http://localhost:9000/users/${user._id}`, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      onUserDeleted(user._id)
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting user:", error)
      // Add error handling for network issues
      const errorMessage =
        axios.isAxiosError(error) && !error.response
          ? "Network error: Unable to connect to the server. User not deleted."
          : "Failed to delete user. Please try again."

      // You could add a toast notification here
      alert(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the user <strong>{user.name}</strong> ({user.email}). This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

