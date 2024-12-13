import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-react'

const doctors = [
  { id: 1, name: "Dr. John Smith", specialization: "Cardiology", contact: "+1 234 567 8901", status: "On Duty" },
  { id: 2, name: "Dr. Sarah Johnson", specialization: "Pediatrics", contact: "+1 234 567 8902", status: "Off Duty" },
  { id: 3, name: "Dr. Michael Lee", specialization: "Neurology", contact: "+1 234 567 8903", status: "On Leave" },
  { id: 4, name: "Dr. Emily Brown", specialization: "Orthopedics", contact: "+1 234 567 8904", status: "On Duty" },
  { id: 5, name: "Dr. David Wilson", specialization: "General Surgery", contact: "+1 234 567 8905", status: "On Duty" },
]

export default function DoctorsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctors Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Doctor
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input placeholder="Search doctors..." className="max-w-sm" />
        <Button variant="secondary">Search</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.contact}</TableCell>
              <TableCell>{doctor.status}</TableCell>
              <TableCell>
                <Button variant="ghost">Edit</Button>
                <Button variant="ghost">Schedule</Button>
                <Button variant="ghost" className="text-red-500">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

