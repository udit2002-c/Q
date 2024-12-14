import Link from 'next/link'
import { Hospital, Lock, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HospitalLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Hospital className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to CareQ</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the hospital portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
              />
            </div>
          </div>
          <Button className="w-full">Login</Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/hospital/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <div className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/hospital/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

