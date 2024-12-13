'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, AlertCircle } from 'lucide-react'

export default function PatientDashboard() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/patient/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 25, 2023</div>
            <p className="text-xs text-muted-foreground">Dr. Smith - Cardiology</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 minutes</div>
            <p className="text-xs text-muted-foreground">For your next appointment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Test Results</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 new</div>
            <p className="text-xs text-muted-foreground">Click to view</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Medication reminder</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dr. Smith - Cardiology</p>
                  <p className="text-sm text-muted-foreground">May 25, 2023 - 10:00 AM</p>
                </div>
                <Button variant="outline">Reschedule</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dr. Johnson - General Checkup</p>
                  <p className="text-sm text-muted-foreground">June 10, 2023 - 2:00 PM</p>
                </div>
                <Button variant="outline">Reschedule</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Blood Test Results Uploaded</p>
                  <p className="text-sm text-muted-foreground">May 20, 2023</p>
                </div>
                <Button variant="ghost">View</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Prescription Renewed</p>
                  <p className="text-sm text-muted-foreground">May 18, 2023</p>
                </div>
                <Button variant="ghost">Details</Button>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Appointment Completed</p>
                  <p className="text-sm text-muted-foreground">May 15, 2023</p>
                </div>
                <Button variant="ghost">Summary</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

