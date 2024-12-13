import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const insuranceClaims = [
  { id: 1, date: "2023-05-10", description: "Annual Checkup", amount: "$150", status: "Approved" },
  { id: 2, date: "2023-04-15", description: "Prescription Medication", amount: "$50", status: "Pending" },
  { id: 3, date: "2023-03-20", description: "Specialist Consultation", amount: "$200", status: "Approved" },
]

export default function Insurance() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Insurance Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Insurance Plan</CardTitle>
          <CardDescription>Your active insurance policy details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Provider:</strong> HealthGuard Insurance</p>
            <p><strong>Policy Number:</strong> HG1234567</p>
            <p><strong>Type:</strong> Family Coverage</p>
            <p><strong>Effective Date:</strong> January 1, 2023</p>
            <p><strong>Expiration Date:</strong> December 31, 2023</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>View Full Policy Details</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
          <CardDescription>Status of your recent insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>{claim.description}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button>View All Claims</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Claim</CardTitle>
          <CardDescription>File a new insurance claim</CardDescription>
        </CardHeader>
        <CardContent>
          <p>To submit a new claim, please gather the following information:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Date of service</li>
            <li>Provider information</li>
            <li>Description of services</li>
            <li>Itemized bill</li>
            <li>Any relevant medical records</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button>Start New Claim</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

