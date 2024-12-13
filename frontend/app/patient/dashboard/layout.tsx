'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { User, LayoutDashboard, Calendar, FileText, Shield, Users, LogOut, BedDouble } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/app/contexts/AuthContext'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/patient/dashboard" className="flex items-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">CareQ</span>
          </Link>
        </div>
        <nav className="mt-8">
          <Link href="/patient/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link href="/patient/dashboard/appointments" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Calendar className="h-5 w-5 mr-2" />
            Appointments
          </Link>
          <Link href="/patient/dashboard/queue" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Users className="h-5 w-5 mr-2" />
            Queue
          </Link>
          <Link href="/patient/dashboard/beds" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <BedDouble className="h-5 w-5 mr-2" />
            Beds
          </Link>
          <Link href="/patient/dashboard/medical-records" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <FileText className="h-5 w-5 mr-2" />
            Medical Records
          </Link>
          <Link href="/patient/dashboard/insurance" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Shield className="h-5 w-5 mr-2" />
            Insurance
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="flex items-center text-gray-700 hover:bg-gray-200" onClick={logout}>
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

