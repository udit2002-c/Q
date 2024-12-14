'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Bill {
  id: number
  name: string
  price: number
  description: string
}

export default function AddBillsPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [newBill, setNewBill] = useState<Omit<Bill, 'id'>>({
    name: '',
    price: 0,
    description: '',
  })

  const handleAddBill = () => {
    setBills([...bills, { ...newBill, id: Date.now() }])
    setNewBill({
      name: '',
      price: 0,
      description: '',
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add Bills</h1>
      <div className="grid gap-4 mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={newBill.name}
            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={newBill.price}
            onChange={(e) => setNewBill({ ...newBill, price: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newBill.description}
            onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
          />
        </div>
        <Button onClick={handleAddBill}>Add Bill</Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Bills List</h2>
        <ul className="space-y-2">
          {bills.map((bill) => (
            <li key={bill.id} className="bg-gray-100 p-4 rounded">
              <p><strong>Name:</strong> {bill.name}</p>
              <p><strong>Price:</strong> ₹{bill.price.toFixed(2)}</p>
              <p><strong>Description:</strong> {bill.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

