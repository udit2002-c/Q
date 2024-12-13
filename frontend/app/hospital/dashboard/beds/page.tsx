'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from 'lucide-react'

const bedCategories = ['General', 'Emergency', 'Private', 'Semi Private']

const initialBedCounts = {
  General: 50,
  Emergency: 15,
  Private: 20,
  'Semi Private': 30,
}

export default function BedsManagement() {
  const [bedCounts, setBedCounts] = useState(initialBedCounts)
  const [beds, setBeds] = useState([
    { id: 1, number: "101", type: "General", status: "Occupied", patient: "John Doe" },
    { id: 2, number: "102", type: "Emergency", status: "Available", patient: "-" },
    { id: 3, number: "103", type: "General", status: "Maintenance", patient: "-" },
    { id: 4, number: "201", type: "Private", status: "Occupied", patient: "Jane Smith" },
    { id: 5, number: "202", type: "Semi Private", status: "Available", patient: "-" },
  ])

  const handleCountChange = (category: string, increment: boolean) => {
    setBedCounts(prev => ({
      ...prev,
      [category]: increment ? prev[category] + 1 : Math.max(0, prev[category] - 1)
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Beds Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Bed Counters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bedCategories.map((category) => (
              <div key={category} className="flex flex-col items-center p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCountChange(category, false)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold">{bedCounts[category]}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCountChange(category, true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bed Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beds.map((bed) => (
                <TableRow key={bed.id}>
                  <TableCell>{bed.number}</TableCell>
                  <TableCell>{bed.type}</TableCell>
                  <TableCell>{bed.status}</TableCell>
                  <TableCell>{bed.patient}</TableCell>
                  <TableCell>
                    <Button variant="ghost">Edit</Button>
                    <Button variant="ghost" className="text-red-500">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

