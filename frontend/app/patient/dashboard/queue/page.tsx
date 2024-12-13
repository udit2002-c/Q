'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: "Central Hospital", queueStatus: 5, address: "123 Main St, City", contact: "123-456-7890", supportedInsurances: ["HealthGuard", "MediShield"] },
  { id: 2, name: "City Medical Center", queueStatus: 8, address: "456 Oak Ave, Town", contact: "098-765-4321", supportedInsurances: ["HealthGuard", "CarePlus"] },
  { id: 3, name: "Community Health Hospital", queueStatus: 3, address: "789 Pine Rd, Village", contact: "111-222-3333", supportedInsurances: ["MediShield", "WellnessCover"] },
]

// Mock data for insurance providers
const insuranceProviders = ["HealthGuard", "MediShield", "CarePlus", "WellnessCover"]

export default function PatientQueueManagement() {
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    insurance: '',
    caseType: '',
  })
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)
  const [showHospitals, setShowHospitals] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value })
  }

  const handleSubmitDetails = () => {
    console.log("Submitting patient details:", { ...patientDetails })
    setShowHospitals(true)
  }

  const handleSelectHospital = (hospitalId: number) => {
    setSelectedHospital(hospitalId)
  }

  const handleConfirmHospital = () => {
    if (selectedHospital) {
      const hospital = mockHospitals.find(h => h.id === selectedHospital)
      console.log("Confirming hospital:", hospital)
      alert(`You have been added to the queue at ${hospital?.name}`)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Queue Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            name="name"
            value={patientDetails.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Age"
            name="age"
            type="number"
            value={patientDetails.age}
            onChange={handleInputChange}
          />
          <Select onValueChange={(value) => setPatientDetails({ ...patientDetails, gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Medical Condition"
            name="condition"
            value={patientDetails.condition}
            onChange={handleInputChange}
          />
          <Select onValueChange={(value) => setPatientDetails({ ...patientDetails, insurance: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select insurance provider" />
            </SelectTrigger>
            <SelectContent>
              {insuranceProviders.map((provider) => (
                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setPatientDetails({ ...patientDetails, caseType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmitDetails}>Submit Details</Button>
        </CardContent>
      </Card>

      {showHospitals && (
        <Card>
          <CardHeader>
            <CardTitle>Available Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital Name</TableHead>
                  <TableHead>Queue Status</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Insurance Compatibility</TableHead>
                  <TableHead>Case Type</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHospitals.sort((a, b) => a.queueStatus - b.queueStatus).map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell>{hospital.name}</TableCell>
                    <TableCell>{hospital.queueStatus}</TableCell>
                    <TableCell>{hospital.address}</TableCell>
                    <TableCell>{hospital.contact}</TableCell>
                    <TableCell>
                      {hospital.supportedInsurances.includes(patientDetails.insurance) 
                        ? "Compatible" 
                        : "Not Compatible"}
                    </TableCell>
                    <TableCell>{patientDetails.caseType}</TableCell>
                    <TableCell>
                      <Button 
                        variant={selectedHospital === hospital.id ? "default" : "outline"}
                        onClick={() => handleSelectHospital(hospital.id)}
                      >
                        {selectedHospital === hospital.id ? "Selected" : "Select"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {selectedHospital && (
              <div className="mt-4">
                <Button onClick={handleConfirmHospital}>Confirm Hospital</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

