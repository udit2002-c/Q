'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Hospital, Mail, Phone, MapPin, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HospitalRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hospital_id: '',
    display_name: '',
    address: '',
    google_map_link: '',
    contact_numbers: [''],
    queue_category: false,
    insurance_name: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactNumberChange = (index: number, value: string) => {
    const updatedNumbers = [...formData.contact_numbers]
    updatedNumbers[index] = value
    setFormData(prev => ({ ...prev, contact_numbers: updatedNumbers }))
  }

  const handleInsuranceChange = (value: string[]) => {
    setFormData(prev => ({ ...prev, insurance_name: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend API
    console.log(formData)
    // Redirect to login page after successful registration
    router.push('/hospital/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Hospital className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Register Hospital</CardTitle>
          <CardDescription className="text-center">
            Create an account for your hospital to join CareQ
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="hospital_id" className="text-sm font-medium">Hospital ID</label>
              <Input 
                id="hospital_id" 
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleInputChange}
                placeholder="Enter hospital ID" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="display_name" className="text-sm font-medium">Hospital Name</label>
              <Input 
                id="display_name" 
                name="display_name"
                value={formData.display_name}
                onChange={handleInputChange}
                placeholder="Enter hospital name" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Textarea 
                id="address" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter hospital address" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="google_map_link" className="text-sm font-medium">Google Maps Link</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="google_map_link" 
                  name="google_map_link"
                  value={formData.google_map_link}
                  onChange={handleInputChange}
                  placeholder="Enter Google Maps link" 
                  className="pl-10" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Numbers</label>
              {formData.contact_numbers.map((number, index) => (
                <div key={index} className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={number}
                    onChange={(e) => handleContactNumberChange(index, e.target.value)}
                    placeholder="Enter contact number"
                    className="pl-10"
                    required
                  />
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData(prev => ({ ...prev, contact_numbers: [...prev.contact_numbers, ''] }))}
              >
                Add Another Contact Number
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Queue Category</label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="queue_category" 
                  checked={formData.queue_category}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, queue_category: checked as boolean }))}
                />
                <label
                  htmlFor="queue_category"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Emergency and General
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="insurance_name" className="text-sm font-medium">Supported Insurance Plans</label>
              <Select 
                onValueChange={(value) => handleInsuranceChange(value as unknown as string[])} 
                value={formData.insurance_name as unknown as string}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MaxLife">MaxLife</SelectItem>
                  <SelectItem value="MyInsurance">MyInsurance</SelectItem>
                  <SelectItem value="LIC">LIC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Register Hospital</Button>
          </CardFooter>
        </form>
        <div className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/hospital/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

