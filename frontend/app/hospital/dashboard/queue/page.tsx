'use client'

import React,{ useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import BillingForm from '@/components/ui/billing-form'

// Mock data based on the queueSchema
const mockQueue = [
  { _id: '1', patient_id: 'P001', name: "John Doe", age: 35, gender: "Male", condition: "Fever", facility_type: 'GENERAL', assignedOn: new Date('2023-05-20T10:00:00'), insurance: "HealthGuard", caseType: "general" },
  { _id: '2', patient_id: 'P002', name: "Jane Smith", age: 28, gender: "Female", condition: "Sprained ankle", facility_type: 'GENERAL', assignedOn: new Date('2023-05-20T10:30:00'), insurance: "MediShield", caseType: "general" },
  { _id: '3', patient_id: 'P003', name: "Bob Johnson", age: 45, gender: "Male", condition: "Chest pain", facility_type: 'EMERGENCY', assignedOn: new Date('2023-05-20T11:00:00'), insurance: "CarePlus", caseType: "emergency" },
]

// Mock data for hospital's supported insurances
const supportedInsurances = ["HealthGuard", "MediShield"]

export default function QueueManagement() {
  const [queue, setQueue] = useState(mockQueue)
  const [filter, setFilter] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentPatient, setCurrentPatient] = useState<typeof mockQueue[0] | null>(null)

  const handleAttendPatient = (patient: typeof mockQueue[0]) => {
    setCurrentPatient(patient)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (formData: any) => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // You can add additional logic here to calculate total price if needed
    // Remove the patient from the queue
    setQueue(queue.filter(p => p._id !== currentPatient?._id))
    setIsFormOpen(false)
    setCurrentPatient(null)
  }

  const filteredQueue = queue.filter(patient => 
    patient.name.toLowerCase().includes(filter.toLowerCase()) ||
    patient.patient_id.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Queue Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Search by name or ID"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Facility Type</TableHead>
                <TableHead>Assigned On</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Case Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>{patient.patient_id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.facility_type}</TableCell>
                  <TableCell>{patient.assignedOn.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={supportedInsurances.includes(patient.insurance) ? "default" : "destructive"}>
                      {patient.insurance}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.caseType}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAttendPatient(patient)}>Attend</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Patient Billing</DialogTitle>
            <DialogDescription>
              Enter billing details for OPD consultation, medicines, and lab tests for {currentPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <BillingForm onSubmit={handleFormSubmit} patientName={currentPatient?.name || ''} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

