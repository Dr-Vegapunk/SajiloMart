
"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { useRouter } from 'next/navigation'

import toast from "react-hot-toast"

// Update the RegisterSchema to match the User model requirements
const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").max(50, "Name is too long").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  address: Yup.string(),
  phone: Yup.string(),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
})

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  phone: "",
  agreeTerms: false,
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (values, { setSubmitting }) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      address: values.address,
      phone: values.phone,
    }

    console.log(userData)
    setTimeout(() => {
      setSubmitting(false)
    }, 500)
  }

  const handleRegister = async (values) => {
    try {
      const res = await axios.post('http://localhost:9000/register', values)
      if (res.status === 200|| res.status === 201) {
        console.log(res)
        toast.success(res.data?.message)
        router.push('/login')
      }
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-sm text-gray-500">Join SajiloMart for the best shopping experience</p>
      </div>
      <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-9"
                />
                <ErrorMessage name="name" component="div" className="text-xs text-[#D22630]" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-9"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 h-9"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 h-9"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address" className="text-sm">
                  Address (Optional)
                </Label>
                <Field
                  as={Input}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your address"
                  className="h-9"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm">
                  Phone Number (Optional)
                </Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Your phone number"
                  className="h-9"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
            </div>
            <div className="flex items-start space-x-2 mt-1">
              <div className="mt-0.5">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={values.agreeTerms}
                  onCheckedChange={(checked) => setFieldValue("agreeTerms", checked)}
                  className="h-4 w-4"
                />
              </div>
              <div>
                <Label htmlFor="agreeTerms" className="text-xs font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#D22630] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#D22630] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
                <ErrorMessage
                  name="agreeTerms"
                  component="div"
                  className="text-xs text-[#D22630]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D22630] hover:bg-[#B01F28] text-white h-9 text-sm"
              disabled={isSubmitting}
              onClick={() => handleRegister(values)}
            >
              <UserPlus className="mr-2 h-3.5 w-3.5" />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or</span>
        </div>
      </div>
      <div className="text-center text-xs">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#D22630] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
