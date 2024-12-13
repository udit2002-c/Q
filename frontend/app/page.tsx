'use client'
import React from 'react'
import Link from 'next/link'
import { Hospital, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to CareQ</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/hospital/login">
          <Button className="w-64 h-32 text-xl">
            <Hospital className="mr-2 h-6 w-6" /> Hospital Portal
          </Button>
        </Link>
        <Link href="/patient/login">
          <Button className="w-64 h-32 text-xl" variant="outline">
            <User className="mr-2 h-6 w-6" /> Patient Portal
          </Button>
        </Link>
      </div>
    </div>
  )
}

