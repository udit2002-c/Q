import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardStats } from '@/components/DashboardStats'
import { DashboardActions } from '@/components/DashboardActions'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <DashboardHeader />
      <DashboardStats />
      <DashboardActions />
    </div>
  )
}

