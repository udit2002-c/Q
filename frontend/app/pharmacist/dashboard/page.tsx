'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, Users } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/pharmacist/dashboard/inventory">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package2 className="h-6 w-6" />
                Manage Inventory
              </CardTitle>
              <CardDescription>
                Manage medicine stocks, equipment, and supplies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150 Items</div>
              <p className="text-muted-foreground">12 items low on stock</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/pharmacist/dashboard/patients">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Manage Patients
              </CardTitle>
              <CardDescription>
                View and manage patient prescriptions and tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 Patients</div>
              <p className="text-muted-foreground">8 pending prescriptions</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

