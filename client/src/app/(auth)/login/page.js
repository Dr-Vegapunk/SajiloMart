"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  }

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle login logic here
    console.log(values)
    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your SajiloMart account</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-[#D22630]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-[#D22630] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-[#D22630]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                name="rememberMe"
                checked={values.rememberMe}
                onCheckedChange={(checked) => setFieldValue("rememberMe", checked)}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#D22630] hover:bg-[#B01F28] text-white"
              disabled={isSubmitting}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or</span>
        </div>
      </div>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-[#D22630] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
