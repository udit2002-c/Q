'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AddBedsPage() {
  const [beds, setBeds] = useState(100)
  const [newBeds, setNewBeds] = useState(0)

  const handleAddBeds = () => {
    setBeds(beds + newBeds)
    setNewBeds(0)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add Beds</h1>
      <div className="flex items-center space-x-4">
        <p className="text-xl">Current number of beds: {beds}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Beds</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Beds</DialogTitle>
              <DialogDescription>
                Enter the number of beds you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="beds" className="text-right">
                  Beds
                </Label>
                <Input
                  id="beds"
                  type="number"
                  className="col-span-3"
                  value={newBeds}
                  onChange={(e) => setNewBeds(parseInt(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBeds}>Add Beds</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

