'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Dummy data
const initialPatients = [
  {
    id: 1,
    name: "Udit Tewari",
    date_of_birth: "1990-01-01",
    gender: "MALE",
    description: "Regular checkup",
    prescriptions: [
      {
        name: "Paracetamol",
        description: "For fever",
        quantity: 10,
        date_prescribed: "2023-06-01",
        type: "medicine",
        done: false,
        price: 15.99
      },
      {
        name: "Blood Test",
        description: "Complete blood count",
        quantity: 1,
        date_prescribed: "2023-06-02",
        type: "test",
        done: true,
        price: 45.00
      }
    ]
  },
  {
    id: 2,
    name: "Suhani H",
    date_of_birth: "1985-05-15",
    gender: "FEMALE",
    description: "Chronic condition follow-up",
    prescriptions: [
      {
        name: "Metformin",
        description: "For diabetes management",
        quantity: 60,
        date_prescribed: "2023-06-10",
        type: "medicine",
        done: true,
        price: 25.50
      },
      {
        name: "HbA1c Test",
        description: "Glycated hemoglobin test",
        quantity: 1,
        date_prescribed: "2023-06-10",
        type: "test",
        done: false,
        price: 35.00
      },
      {
        name: "Lisinopril",
        description: "For blood pressure control",
        quantity: 30,
        date_prescribed: "2023-06-10",
        type: "medicine",
        done: true,
        price: 20.75
      }
    ]
  },
  {
    id: 3,
    name: "Suhas B M",
    date_of_birth: "1978-11-30",
    gender: "MALE",
    description: "Post-surgery follow-up",
    prescriptions: [
      {
        name: "Tramadol",
        description: "For pain management",
        quantity: 20,
        date_prescribed: "2023-06-15",
        type: "medicine",
        done: true,
        price: 30.25
      },
      {
        name: "X-ray",
        description: "Check healing progress",
        quantity: 1,
        date_prescribed: "2023-06-15",
        type: "test",
        done: false,
        price: 75.00
      },
      {
        name: "Physical Therapy",
        description: "Rehabilitation sessions",
        quantity: 10,
        date_prescribed: "2023-06-15",
        type: "test",
        done: false,
        price: 50.00
      },
      {
        name: "Ibuprofen",
        description: "For inflammation",
        quantity: 30,
        date_prescribed: "2023-06-15",
        type: "medicine",
        done: true,
        price: 12.99
      }
    ]
  }
]

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients)

  const handleToggleDone = (patientId: number, prescriptionName: string) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          prescriptions: patient.prescriptions.map(prescription => {
            if (prescription.name === prescriptionName) {
              return { ...prescription, done: !prescription.done }
            }
            return prescription
          })
        }
      }
      return patient
    }))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Patient Management</h1>

      {patients.map((patient) => (
        <div key={patient.id} className="mb-8">
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h2 className="text-2xl font-semibold">{patient.name}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p>{patient.date_of_birth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p>{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{patient.description}</p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date Prescribed</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Done</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patient.prescriptions.map((prescription) => (
                <TableRow key={prescription.name}>
                  <TableCell>{prescription.name}</TableCell>
                  <TableCell>{prescription.description}</TableCell>
                  <TableCell>{prescription.quantity}</TableCell>
                  <TableCell>{prescription.date_prescribed}</TableCell>
                  <TableCell>{prescription.type}</TableCell>
                  <TableCell>₹{prescription.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={prescription.done}
                      onCheckedChange={() => handleToggleDone(patient.id, prescription.name)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}

