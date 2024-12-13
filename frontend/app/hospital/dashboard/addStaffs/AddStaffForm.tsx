import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type StaffCategory = 'nurses' | 'maintainers' | 'supportStaff'

interface StaffMember {
  name: string
  detail: string
}

interface AddStaffFormProps {
  category: StaffCategory
  onAdd: (data: StaffMember) => void
}

export default function AddStaffForm({ category, onAdd }: AddStaffFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<StaffMember>()

  const onSubmit = (data: StaffMember) => {
    onAdd(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="detail">
          {category === 'nurses' ? 'Description' : category === 'maintainers' ? 'Department' : 'Role'}
        </Label>
        <Input 
          id="detail" 
          {...register('detail', { required: `${category === 'nurses' ? 'Description' : category === 'maintainers' ? 'Department' : 'Role'} is required` })} 
        />
        {errors.detail && <p className="text-red-500 text-sm">{errors.detail.message}</p>}
      </div>
      <Button type="submit">Add Staff Member</Button>
    </form>
  )
}

