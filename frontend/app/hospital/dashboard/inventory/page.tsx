'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from 'lucide-react'

// Mock data based on the inventoryItemSchema
const mockInventory = [
  { _id: '1', category: 'MEDICINE', name: 'Paracetamol', description: 'Pain reliever', stock_quantity: 1000, last_refill_date: new Date('2023-05-01'), expiry_date: new Date('2024-05-01') },
  { _id: '2', category: 'EQUIPMENT', name: 'Stethoscope', description: 'Medical listening device', stock_quantity: 50, last_refill_date: new Date('2023-04-15'), expiry_date: null },
  { _id: '3', category: 'SUPPLIES', name: 'Disposable Gloves', description: 'Protective hand wear', stock_quantity: 5000, last_refill_date: new Date('2023-05-10'), expiry_date: new Date('2025-05-10') },
  { _id: '4', category: 'MEDICINE', name: 'Amoxicillin', description: 'Antibiotic', stock_quantity: 500, last_refill_date: new Date('2023-05-05'), expiry_date: new Date('2024-05-05') },
  { _id: '5', category: 'EQUIPMENT', name: 'Blood Pressure Monitor', description: 'BP measuring device', stock_quantity: 20, last_refill_date: new Date('2023-04-20'), expiry_date: null },
]

const categories = ['MEDICINE', 'EQUIPMENT', 'SUPPLIES']

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(mockInventory)
  const [newItem, setNewItem] = useState({
    category: '',
    name: '',
    description: '',
    stock_quantity: 0,
    last_refill_date: '',
    expiry_date: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setNewItem({ ...newItem, category: value })
  }

  const handleAddItem = () => {
    const itemToAdd = {
      _id: Math.random().toString(36).substr(2, 9),
      ...newItem,
      stock_quantity: Number(newItem.stock_quantity),
      last_refill_date: new Date(newItem.last_refill_date),
      expiry_date: newItem.expiry_date ? new Date(newItem.expiry_date) : null,
    }

    setInventory([...inventory, itemToAdd])
    setNewItem({
      category: '',
      name: '',
      description: '',
      stock_quantity: 0,
      last_refill_date: '',
      expiry_date: '',
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={handleSelectChange} value={newItem.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Item Name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={newItem.stock_quantity}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Last Refill Date"
              name="last_refill_date"
              type="date"
              value={newItem.last_refill_date}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Expiry Date"
              name="expiry_date"
              type="date"
              value={newItem.expiry_date}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="MEDICINE">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Stock Quantity</TableHead>
                  <TableHead>Last Refill Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.stock_quantity}</TableCell>
                      <TableCell>{item.last_refill_date.toLocaleDateString()}</TableCell>
                      <TableCell>{item.expiry_date ? item.expiry_date.toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <Button variant="ghost">Edit</Button>
                        <Button variant="ghost">Restock</Button>
                        <Button variant="ghost" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

