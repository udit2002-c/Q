'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Patient {
  id: number
  name: string
  dateOfBirth: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  description: string
  bills: { name: string; price: number }[]
}

export default function ManagePatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id' | 'bills'>>({
    name: '',
    dateOfBirth: '',
    gender: 'MALE',
    description: '',
  })

  const handleAddPatient = () => {
    setPatients([...patients, { ...newPatient, id: Date.now(), bills: [] }])
    setNewPatient({
      name: '',
      dateOfBirth: '',
      gender: 'MALE',
      description: '',
    })
  }

  const handleAddBill = (patientId: number, billName: string, billPrice: number) => {
    setPatients(patients.map(patient => 
      patient.id === patientId 
        ? { ...patient, bills: [...patient.bills, { name: billName, price: billPrice }] }
        : patient
    ))
  }

  const handleAcceptPayment = (patientId: number) => {
    setPatients(patients.map(patient => 
      patient.id === patientId 
        ? { ...patient, bills: [] }
        : patient
    ))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Patients</h1>
      <div className="grid gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={newPatient.dateOfBirth}
              onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            onValueChange={(value) => setNewPatient({ ...newPatient, gender: value as 'MALE' | 'FEMALE' | 'OTHER' })}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newPatient.description}
            onChange={(e) => setNewPatient({ ...newPatient, description: e.target.value })}
          />
        </div>
        <Button onClick={handleAddPatient}>Add Patient</Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Patients List</h2>
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li key={patient.id} className="bg-gray-100 p-4 rounded">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Description:</strong> {patient.description}</p>
              <h3 className="font-bold mt-2">Bills</h3>
              <ul className="list-disc list-inside">
                {patient.bills.map((bill, index) => (
                  <li key={index}>{bill.name}: ${bill.price.toFixed(2)}</li>
                ))}
              </ul>
              <div className="mt-2">
                <Input
                  placeholder="Bill Name"
                  className="mb-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement
                      handleAddBill(patient.id, target.value, 0)
                      target.value = ''
                    }
                  }}
                />
                <Button onClick={() => handleAcceptPayment(patient.id)}>Accept Payment</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

