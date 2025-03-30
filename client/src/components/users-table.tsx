"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Loader2 } from "lucide-react"
import { format } from "date-fns"

import EditUserDialog from "./edit-user-dialog"
import DeleteUserDialog from "./delete-user-dialog"
import toast from "react-hot-toast"

interface User {
  _id: string
  name: string
  email: string
  role: "user" | "admin"
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchQuery, users])

  // Update the fetchUsers function to include better error handling and a fallback mechanism
  const fetchUsers = async () => {
    try {
      setLoading(true)
      // Add timeout to prevent hanging requests
      const response = await axios.get("http://localhost:9000/users", {
        timeout: 5000,
        // Add withCredentials if you need to send cookies
        // withCredentials: true,
        // // Add headers if needed for CORS
        // headers: {
        //   "Content-Type": "application/json",
        //   Accept: "application/json",
        // },
      })
      setUsers(response.data)
      setFilteredUsers(response.data)
      setError("")
    } catch (err) {
      
      // Check if it's a network error and provide more helpful message
      if (axios.isAxiosError(err) && !err.response) {
        setError(
          "Network error: Unable to connect to the server. Please check if your backend is running at http://localhost:9000",
        )
        
      } else {
        setError(`Failed to load users: ${err instanceof Error ? err.message : "Unknown error"}`)
      }
      toast.error("Failed to load users. Using fallback data.")
    } finally {
      setLoading(false)
    }
  }

  

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)))
    toast.success("User updated successfully")
  }

  const handleUserDeleted = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
    toast.success("User deleted successfully")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading users...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-destructive/10 p-6 rounded-md text-destructive">
          <h3 className="font-semibold mb-2">Connection Error</h3>
          <p className="mb-4">{error}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => fetchUsers()}>
              Retry Connection
            </Button>
            {users.length > 0 && (
              <Button variant="default" onClick={() => setError("")}>
                Continue with Available Data
              </Button>
            )}
          </div>
        </div>

        {users.length > 0 && (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800">
            <p className="text-sm font-medium">⚠️ Using locally cached data. Some features may be limited.</p>
          </div>
        )}

        {users.length > 0 && (
          // Show the table with available data even if there was an error
          <div className="rounded-md border mt-4">
            <Table>
              {/* Table content remains the same */}
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.phone || "—"}</TableCell>
                    <TableCell>{user.address || "—"}</TableCell>
                    <TableCell>{user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setUserToEdit(user)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setUserToDelete(user)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => fetchUsers()}>Refresh</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{user.phone || "—"}</TableCell>
                  <TableCell>{user.address || "—"}</TableCell>
                  <TableCell>{user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "—"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setUserToEdit(user)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setUserToDelete(user)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {userToEdit && (
        <EditUserDialog
          user={userToEdit}
          open={!!userToEdit}
          onOpenChange={(open) => !open && setUserToEdit(null)}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {userToDelete && (
        <DeleteUserDialog
          user={userToDelete}
          open={!!userToDelete}
          onOpenChange={(open) => !open && setUserToDelete(null)}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  )
}

