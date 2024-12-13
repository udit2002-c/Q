import { ReactNode } from 'react'
import Link from 'next/link'
import { Hospital, LayoutDashboard, Bed, Users, Package, UserIcon as UserMd, Building, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/hospital/dashboard" className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">CareQ</span>
          </Link>
        </div>
        <nav className="mt-8">
          <Link href="/hospital/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link href="/hospital/dashboard/beds" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Bed className="h-5 w-5 mr-2" />
            Beds
          </Link>
          <Link href="/hospital/dashboard/queue" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Users className="h-5 w-5 mr-2" />
            Queue
          </Link>
          <Link href="/hospital/dashboard/inventory" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Package className="h-5 w-5 mr-2" />
            Inventory
          </Link>
          <Link href="/hospital/dashboard/doctors" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <UserMd className="h-5 w-5 mr-2" />
            Doctors
          </Link>
          <Link href="/hospital/dashboard/departments" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Building className="h-5 w-5 mr-2" />
            Departments
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="flex items-center text-gray-700 hover:bg-gray-200">
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

