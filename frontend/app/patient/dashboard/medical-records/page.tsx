import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const medicalRecords = [
  { id: 1, date: "2023-05-15", type: "Blood Test", doctor: "Dr. Smith", status: "Completed" },
  { id: 2, date: "2023-04-20", type: "X-Ray", doctor: "Dr. Johnson", status: "Completed" },
  { id: 3, date: "2023-03-10", type: "General Checkup", doctor: "Dr. Brown", status: "Completed" },
  { id: 4, date: "2023-02-05", type: "Vaccination", doctor: "Dr. Davis", status: "Completed" },
  { id: 5, date: "2023-01-15", type: "Allergy Test", doctor: "Dr. Wilson", status: "Completed" },
]

export default function MedicalRecords() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medical Records</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.doctor}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <Button variant="ghost">View Details</Button>
                <Button variant="ghost">Download</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

