'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Appointments() {
  const [appointmentType, setAppointmentType] = useState('general')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Book New Appointment</CardTitle>
          <CardDescription>Fill out the form below to schedule a new appointment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointment-type">Appointment Type</Label>
            <RadioGroup
              id="appointment-type"
              value={appointmentType}
              onValueChange={setAppointmentType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general">General</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency">Emergency</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Input id="time" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea id="description" placeholder="Briefly describe your medical issue" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Book Appointment</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Dr. Smith - Cardiology</p>
                <p className="text-sm text-muted-foreground">May 25, 2023 - 10:00 AM</p>
              </div>
              <div>
                <Button variant="outline" className="mr-2">Reschedule</Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Dr. Johnson - General Checkup</p>
                <p className="text-sm text-muted-foreground">June 10, 2023 - 2:00 PM</p>
              </div>
              <div>
                <Button variant="outline" className="mr-2">Reschedule</Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

