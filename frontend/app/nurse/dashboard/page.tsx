"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for patients
const patients = [
  { id: 1, name: "John Doe", dateOfBirth: "1990-01-01", gender: "MALE", description: "General checkup" },
  { id: 2, name: "Jane Smith", dateOfBirth: "1985-05-15", gender: "FEMALE", description: "Routine examination" },
  // Add more mock patients as needed
]

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically clear the user's session
    router.push("/")
  }

  const handlePatientClick = (patientId: number) => {
    router.push(`/nurse/patient/${patientId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Nurse Dashboard</span>
            <Button onClick={handleLogout}>Logout</Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admitted Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} onClick={() => handlePatientClick(patient.id)} className="cursor-pointer hover:bg-gray-100">
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

