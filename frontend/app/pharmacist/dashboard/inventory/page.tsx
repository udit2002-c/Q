'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit } from 'lucide-react'

// Dummy data
const initialInventory = [
  {
    id: 1,
    name: "Paracetamol",
    category: "MEDICINE",
    description: "Pain relief medication",
    stock_quantity: 100,
    last_refill_date: "2023-12-01",
    expiry_date: "2024-12-01"
  },
  // Add more items as needed
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleAddItem = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const newItem = {
      id: inventory.length + 1,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      stock_quantity: 0,
      last_refill_date: new Date().toISOString().split('T')[0],
      expiry_date: formData.get('expiry_date') as string
    }
    setInventory([...inventory, newItem])
    setIsAddDialogOpen(false)
  }

  const handleEditStock = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const updatedInventory = inventory.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          stock_quantity: Number(formData.get('stock_quantity')),
          last_refill_date: new Date().toISOString().split('T')[0]
        }
      }
      return item
    })
    setInventory(updatedInventory)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Inventory Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Add a new item to the inventory
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEDICINE">Medicine</SelectItem>
                    <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                    <SelectItem value="SUPPLIES">Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input id="expiry_date" name="expiry_date" type="date" required />
              </div>
              <Button type="submit">Add Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Last Refill</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.stock_quantity}</TableCell>
              <TableCell>{item.last_refill_date}</TableCell>
              <TableCell>{item.expiry_date}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedItem(item)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stock</DialogTitle>
            <DialogDescription>
              Update stock quantity for {selectedItem?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditStock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                name="stock_quantity"
                type="number"
                defaultValue={selectedItem?.stock_quantity}
                required
              />
            </div>
            <Button type="submit">Update Stock</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

