import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Link href="/hospital-new/add-beds">
        <Button className="w-full">Add Beds</Button>
      </Link>
      <Link href="/hospital-new/add-doctors">
        <Button className="w-full">Add New Doctors</Button>
      </Link>
      <Link href="/hospital-new/manage-patients">
        <Button className="w-full">Manage Patients</Button>
      </Link>
      <Link href="/hospital-new/add-staffs">
        <Button className="w-full">Add Staff</Button>
      </Link>
      <Link href="/hospital-new/add-bills">
        <Button className="w-full">Add Bills</Button>
      </Link>
    </div>
  );
}
