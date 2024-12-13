import Link from 'next/link'
import { Hospital, Mail, Phone, MapPin, Shield } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function HospitalRegister() {
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="hospitalName" className="text-sm font-medium">Hospital Name</label>
            <Input id="hospitalName" placeholder="Enter hospital name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">Address</label>
            <Textarea id="address" placeholder="Enter hospital address" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="email" placeholder="m@example.com" type="email" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="phone" placeholder="Enter phone number" type="tel" className="pl-10" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="mapLink" className="text-sm font-medium">Map Link</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input id="mapLink" placeholder="Enter Google Maps link" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="insurancePlans" className="text-sm font-medium">Supported Insurance Plans</label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input id="insurancePlans" placeholder="Enter supported insurance plans" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms of service and privacy policy
              </label>
            </div>
          </div>
          <Button className="w-full">Register Hospital</Button>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-600 text-center w-full">
            Already have an account?{" "}
            <Link href="/hospital/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

