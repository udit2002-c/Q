'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const bedCategories = ['General', 'Emergency', 'Private', 'Semi Private']

const mockHospitals = [
  { id: 1, name: "Central Hospital", beds: { General: 50, Emergency: 15, Private: 20, 'Semi Private': 30 } },
  { id: 2, name: "City Medical Center", beds: { General: 40, Emergency: 10, Private: 15, 'Semi Private': 25 } },
  { id: 3, name: "Community Health Hospital", beds: { General: 30, Emergency: 8, Private: 10, 'Semi Private': 20 } },
]

export default function PatientBedManagement() {
  const [selectedHospital, setSelectedHospital] = useState(mockHospitals[0])
  const [availableBeds, setAvailableBeds] = useState(selectedHospital.beds)

  useEffect(() => {
    setAvailableBeds(selectedHospital.beds)
  }, [selectedHospital])

  const handleHospitalChange = (hospitalId: string) => {
    const hospital = mockHospitals.find(h => h.id.toString() === hospitalId)
    if (hospital) {
      setSelectedHospital(hospital)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bed Availability</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Hospital</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleHospitalChange} defaultValue={selectedHospital.id.toString()}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a hospital" />
            </SelectTrigger>
            <SelectContent>
              {mockHospitals.map((hospital) => (
                <SelectItem key={hospital.id} value={hospital.id.toString()}>
                  {hospital.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Beds at {selectedHospital.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed Type</TableHead>
                <TableHead>Available Beds</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bedCategories.map((category) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>{availableBeds[category]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

