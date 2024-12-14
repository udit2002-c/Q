'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Doctor {
  id: number
  name: string
  contactNumber: string
  qualification: string
  experienceYears: number
  duty: 'morning' | 'evening'
}

export default function AddDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, 'id'>>({
    name: '',
    contactNumber: '',
    qualification: '',
    experienceYears: 0,
    duty: 'morning',
  })

  const handleAddDoctor = () => {
    setDoctors([...doctors, { ...newDoctor, id: Date.now() }])
    setNewDoctor({
      name: '',
      contactNumber: '',
      qualification: '',
      experienceYears: 0,
      duty: 'morning',
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add and Manage Doctors</h1>
      <div className="grid gap-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              value={newDoctor.contactNumber}
              onChange={(e) => setNewDoctor({ ...newDoctor, contactNumber: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              value={newDoctor.qualification}
              onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="experienceYears">Experience (Years)</Label>
            <Input
              id="experienceYears"
              type="number"
              value={newDoctor.experienceYears}
              onChange={(e) => setNewDoctor({ ...newDoctor, experienceYears: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="duty">Duty</Label>
          <Select
            onValueChange={(value) => setNewDoctor({ ...newDoctor, duty: value as 'morning' | 'evening' })}
          >
            <SelectTrigger id="duty">
              <SelectValue placeholder="Select duty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddDoctor}>Add Doctor</Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="bg-gray-100 p-4 rounded">
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Contact:</strong> {doctor.contactNumber}</p>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Experience:</strong> {doctor.experienceYears} years</p>
              <p><strong>Duty:</strong> {doctor.duty}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

