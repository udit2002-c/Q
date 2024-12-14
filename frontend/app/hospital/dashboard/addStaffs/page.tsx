'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StaffList from './StaffList'
import AddStaffForm from './AddStaffForm'

type StaffCategory = 'nurses' | 'maintainers' | 'supportStaff'

type StaffMember = {
  id: number
  name: string
  detail: string
}

type StaffList = {
  [key in StaffCategory]: StaffMember[]
}

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<StaffCategory | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [staffList, setStaffList] = useState<StaffList>({
    nurses: [
      { id: 1, name: 'Udit Tewari', detail: 'Emergency' },
      { id: 2, name: 'Shikhi Chandrashekar', detail: 'Pediatrics' },
    ],
    maintainers: [
      { id: 1, name: 'Ram Mishra', detail: 'Electrical' },
      { id: 2, name: 'Alice Brown', detail: 'Plumbing' },
    ],
    supportStaff: [
      { id: 1, name: 'Charlie Davis', detail: 'Receptionist' },
      { id: 2, name: 'Eva Wilson', detail: 'IT Support' },
    ],
  })

  const handleCategoryClick = (category: StaffCategory) => {
    setActiveCategory(category)
    setShowAddForm(false)
  }

  const handleAddClick = () => {
    setShowAddForm(true)
  }

  const handleAddStaff = (newStaff: Omit<StaffMember, 'id'>) => {
    if (activeCategory) {
      const newId = Math.max(...staffList[activeCategory].map(s => s.id), 0) + 1
      const updatedStaff = [...staffList[activeCategory], { ...newStaff, id: newId }]
      setStaffList(prev => ({ ...prev, [activeCategory]: updatedStaff }))
      setShowAddForm(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hospital Staff Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={() => handleCategoryClick('nurses')}>Nurses</Button>
        <Button onClick={() => handleCategoryClick('maintainers')}>Maintainers</Button>
        <Button onClick={() => handleCategoryClick('supportStaff')}>Support Staff</Button>
      </div>
      {activeCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              <Button onClick={handleAddClick}>Add</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showAddForm ? (
              <AddStaffForm category={activeCategory} onAdd={handleAddStaff} />
            ) : (
              <StaffList category={activeCategory} staff={staffList[activeCategory]} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

