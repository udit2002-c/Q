"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Dummy data for patients
const patients = [
  { id: 1, name: "Udit Tewari", dob: "1990-01-01", gender: "MALE", stage: "WAITING" },
  { id: 2, name: "Yash Gupta", dob: "1985-05-15", gender: "FEMALE", stage: "CONSULTING" },
  { id: 3, name: "Sreelaksmi Nair", dob: "1978-11-30", gender: "MALE", stage: "ADMITTED" },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.stage}</TableCell>
                  <TableCell>
                    <Button onClick={() => router.push(`/doctor/patient/${patient.id}`)}>View Details</Button>
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

