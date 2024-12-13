import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-react'

const departments = [
  { id: 1, name: "Cardiology", head: "Dr. John Smith", staff: 15, patients: 30 },
  { id: 2, name: "Pediatrics", head: "Dr. Sarah Johnson", staff: 20, patients: 45 },
  { id: 3, name: "Neurology", head: "Dr. Michael Lee", staff: 12, patients: 25 },
  { id: 4, name: "Orthopedics", head: "Dr. Emily Brown", staff: 18, patients: 35 },
  { id: 5, name: "General Surgery", head: "Dr. David Wilson", staff: 25, patients: 40 },
]

export default function DepartmentsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Departments Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Department
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input placeholder="Search departments..." className="max-w-sm" />
        <Button variant="secondary">Search</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department Name</TableHead>
            <TableHead>Department Head</TableHead>
            <TableHead>Staff Count</TableHead>
            <TableHead>Current Patients</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.head}</TableCell>
              <TableCell>{department.staff}</TableCell>
              <TableCell>{department.patients}</TableCell>
              <TableCell>
                <Button variant="ghost">Edit</Button>
                <Button variant="ghost">View Details</Button>
                <Button variant="ghost" className="text-red-500">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

