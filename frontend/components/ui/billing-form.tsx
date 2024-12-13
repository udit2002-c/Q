'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BillingFormProps {
  onSubmit: (formData: any) => void
  patientName: string
}

export default function BillingForm({ onSubmit, patientName }: BillingFormProps) {
  const [opdCharge, setOpdCharge] = useState('')
  const [medicines, setMedicines] = useState([{ name: '', quantity: '', price: '' }])
  const [labTests, setLabTests] = useState([{ name: '', price: '' }])

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', quantity: '', price: '' }])
  }

  const handleMedicineChange = (index: number, field: 'name' | 'quantity' | 'price', value: string) => {
    const updatedMedicines = medicines.map((medicine, i) => {
      if (i === index) {
        return { ...medicine, [field]: value }
      }
      return medicine
    })
    setMedicines(updatedMedicines)
  }

  const handleAddLabTest = () => {
    setLabTests([...labTests, { name: '', price: '' }])
  }

  const handleLabTestChange = (index: number, field: 'name' | 'price', value: string) => {
    const updatedLabTests = labTests.map((test, i) => {
      if (i === index) {
        return { ...test, [field]: value }
      }
      return test
    })
    setLabTests(updatedLabTests)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      patientName,
      opdCharge,
      medicines,
      labTests
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="opdCharge">OPD Consultation Charge</Label>
        <Input
          id="opdCharge"
          value={opdCharge}
          onChange={(e) => setOpdCharge(e.target.value)}
          placeholder="Enter OPD charge"
          type="number"
        />
      </div>

      <div>
        <Label>Pharmacy</Label>
        {medicines.map((medicine, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              value={medicine.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              placeholder="Medicine name"
            />
            <Input
              value={medicine.quantity}
              onChange={(e) => handleMedicineChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
              type="number"
            />
            <Input
              value={medicine.price}
              onChange={(e) => handleMedicineChange(index, 'price', e.target.value)}
              placeholder="Price"
              type="number"
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddMedicine} className="mt-2" variant="outline">
          Add Medicine
        </Button>
      </div>

      <div>
        <Label>Lab Tests</Label>
        {labTests.map((test, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              value={test.name}
              onChange={(e) => handleLabTestChange(index, 'name', e.target.value)}
              placeholder="Test name"
            />
            <Input
              value={test.price}
              onChange={(e) => handleLabTestChange(index, 'price', e.target.value)}
              placeholder="Price"
              type="number"
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddLabTest} className="mt-2" variant="outline">
          Add Lab Test
        </Button>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )
}

