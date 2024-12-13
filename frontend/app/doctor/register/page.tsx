"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    qualification: "",
    experienceYears: "",
    duty: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDutyChange = (value: string) => {
    setFormData({ ...formData, duty: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    // Redirect to login page after successful registration
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new doctor account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" onChange={handleChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" name="contactNumber" onChange={handleChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="qualification">Qualification</Label>
                <Input id="qualification" name="qualification" onChange={handleChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="experienceYears">Experience (Years)</Label>
                <Input id="experienceYears" name="experienceYears" type="number" onChange={handleChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duty">Duty</Label>
                <Select onValueChange={handleDutyChange} required>
                  <SelectTrigger id="duty">
                    <SelectValue placeholder="Select duty" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
          <Button type="submit" onClick={handleSubmit}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

