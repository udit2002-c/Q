"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for a single patient
const patient = {
  id: 1,
  name: "John Doe",
  dateOfBirth: "1990-01-01",
  gender: "MALE",
  description: "General checkup",
}

const checkpoints = [
  { id: 1, label: "Vital Signs fine" },
  { id: 2, label: "Level of Consciousness fine" },
  { id: 3, label: "Had food?" },
  { id: 4, label: "Had medicines?" },
  { id: 5, label: "Is Mobility fine" },
]

export default function PatientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [checkpointStates, setCheckpointStates] = useState<{ [key: number]: boolean }>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Here you would typically fetch the patient data based on the ID
    console.log("Fetching patient data for ID:", params.id)
  }, [params.id])

  const handleCheckpointChange = (checkpointId: number, checked: boolean) => {
    setCheckpointStates((prev) => ({ ...prev, [checkpointId]: checked }))
  }

  const handleSubmit = () => {
    // Here you would typically send the checkpoint data to your backend
    console.log("Submitting checkpoint data:", checkpointStates)
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Patient Details</span>
            <Button onClick={() => router.push("/nurse/dashboard")}>Back to Dashboard</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Description:</strong> {patient.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Checkpoints</span>
            <Button onClick={() => setExpanded(!expanded)}>{expanded ? "Collapse" : "Expand"}</Button>
          </CardTitle>
        </CardHeader>
        {expanded && (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Checkpoint</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkpoints.map((checkpoint) => (
                  <TableRow key={checkpoint.id}>
                    <TableCell>{checkpoint.label}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={checkpointStates[checkpoint.id] || false}
                        onCheckedChange={(checked) => handleCheckpointChange(checkpoint.id, checked as boolean)}
                        disabled={submitted}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button onClick={handleSubmit} disabled={submitted}>
                {submitted ? "Submitted" : "Submit"}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

