"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { medicinesAndTests, prescriptions as initialPrescriptions } from "@/app/data/dummy-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Dummy data for patient details
const patientDetails = {
  id: 1,
  name: "John Doe",
  dob: "1990-01-01",
  gender: "MALE",
  stage: "WAITING",
  opdDone: false,
  assignedBed: null,
}

export default function PatientDetail({ params }: { params: { id: string } }) {
  const [opdDone, setOpdDone] = useState(patientDetails.opdDone)
  const [assignedBed, setAssignedBed] = useState(patientDetails.assignedBed)
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [quantity, setQuantity] = useState("1")
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions)

  const handleAssignBed = () => {
    setAssignedBed(Math.floor(Math.random() * 100) + 1)
  }

  const handleAddPrescription = () => {
    if (selectedItem) {
      const newPrescription = {
        id: prescriptions.length + 1,
        name: selectedItem.name,
        description: selectedItem.description,
        quantity: parseInt(quantity, 10),
        datePrescribed: new Date().toISOString().split('T')[0],
        type: selectedItem.type,
        isDoneByDepartment: false,
      }
      setPrescriptions([...prescriptions, newPrescription])
      setShowPrescriptionDialog(false)
      setSelectedItem(null)
      setQuantity("1")
      setSearchTerm("")
    }
  }

  const filteredItems = medicinesAndTests.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Details: {patientDetails.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <strong>Date of Birth:</strong> {patientDetails.dob}
            </div>
            <div>
              <strong>Gender:</strong> {patientDetails.gender}
            </div>
            <div>
              <strong>Current Stage:</strong> {patientDetails.stage}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="opdDone" checked={opdDone} onCheckedChange={setOpdDone} />
              <label htmlFor="opdDone">OPD Done</label>
            </div>
          </div>
          <div className="mb-4">
            <Button onClick={handleAssignBed} disabled={assignedBed !== null}>
              {assignedBed ? `Bed ${assignedBed} Assigned` : "Assign Bed"}
            </Button>
          </div>
          <div className="mb-4">
            <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
              <DialogTrigger asChild>
                <Button>Add Prescription or Test</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Prescription or Test</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Command>
                    <CommandInput placeholder="Search medicines and tests..." onValueChange={setSearchTerm} />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {filteredItems.map((item) => (
                          <CommandItem
                            key={item.id}
                            onSelect={() => setSelectedItem(item)}
                            className="cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <span className="ml-2 text-sm text-gray-500">{item.type}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                  {selectedItem && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="col-span-3"
                        min="1"
                      />
                    </div>
                  )}
                </div>
                <Button onClick={handleAddPrescription} disabled={!selectedItem}>
                  Add Prescription or Test
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date Prescribed</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Done by Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.name}</TableCell>
                  <TableCell>{prescription.description}</TableCell>
                  <TableCell>{prescription.quantity}</TableCell>
                  <TableCell>{prescription.datePrescribed}</TableCell>
                  <TableCell>{prescription.type}</TableCell>
                  <TableCell>
                    <Checkbox checked={prescription.isDoneByDepartment} />
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

