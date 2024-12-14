import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StaffCategory, StaffMember } from './types'

interface StaffListProps {
  category: StaffCategory
  staff: StaffMember[]
}

export default function StaffList({ category, staff }: StaffListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>{category === 'nurses' ? 'Description' : category === 'maintainers' ? 'Department' : 'Role'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.detail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

