'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    patient_id: '',
    name: '',
    date_of_birth: '',
    contact_number: '',
    gender: '',
    photoURL: '',
    type: 'OUTPATIENT',
    insurance_acc: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend API
    console.log(formData)
    // Redirect to login page after successful registration
    router.push('/patient/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Register as a Patient</CardTitle>
          <CardDescription className="text-center">
            Create an account to access CareQ patient services
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="patient_id" className="text-sm font-medium">Patient ID</label>
              <Input 
                id="patient_id" 
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
                placeholder="Enter patient ID" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name" 
                required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date_of_birth" className="text-sm font-medium">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact_number" className="text-sm font-medium">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium">Gender</label>
              <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
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
            <div className="space-y-2">
              <label htmlFor="photoURL" className="text-sm font-medium">Photo URL</label>
              <Input 
                id="photoURL" 
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
                placeholder="Enter photo URL" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Patient Type</label>
              <Select onValueChange={(value) => handleSelectChange('type', value)} value={formData.type}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select patient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INPATIENT">Inpatient</SelectItem>
                  <SelectItem value="OUTPATIENT">Outpatient</SelectItem>
                  <SelectItem value="EMERGENCY">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="insurance_acc" className="text-sm font-medium">Insurance Account</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="insurance_acc" 
                  name="insurance_acc"
                  value={formData.insurance_acc}
                  onChange={handleInputChange}
                  placeholder="Enter insurance account details" 
                  className="pl-10" 
                  required 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Register</Button>
          </CardFooter>
        </form>
        <div className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/patient/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

