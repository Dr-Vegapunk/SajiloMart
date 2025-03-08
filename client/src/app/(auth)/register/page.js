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

  return (
    <div className="space-y-4">
      {" "}
      {/* Reduced space-y-6 to space-y-4 */}
      <div className="space-y-1 text-center">
        {" "}
        {/* Reduced space-y-2 to space-y-1 */}
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1> {/* Reduced text-3xl to text-2xl */}
        <p className="text-sm text-gray-500">Join SajiloMart for the best shopping experience</p> {/* Added text-sm */}
      </div>
      <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form className="space-y-3">
            {" "}
            {/* Reduced space-y-4 to space-y-3 */}
            {/* Grid layout for the form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {" "}
              {/* Added grid layout */}
              {/* First column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>{" "}
                {/* Added text-sm */}
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-9" /* Reduced height */
                />
                <ErrorMessage name="name" component="div" className="text-xs text-[#D22630]" /* Reduced to text-xs */ />
              </div>
              {/* Second column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>{" "}
                {/* Added text-sm */}
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-9" /* Reduced height */
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
              {/* Third column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>{" "}
                {/* Added text-sm */}
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 h-9" /* Added h-9 to reduce height */
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
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
              {/* Fourth column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </Label>{" "}
                {/* Added text-sm */}
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 h-9" /* Added h-9 to reduce height */
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
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
              {/* Fifth column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="address" className="text-sm">
                  Address (Optional)
                </Label>{" "}
                {/* Added text-sm */}
                <Field
                  as={Input}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your address"
                  className="h-9" /* Reduced height */
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
              {/* Sixth column */}
              <div className="space-y-1">
                {" "}
                {/* Reduced space-y-2 to space-y-1 */}
                <Label htmlFor="phone" className="text-sm">
                  Phone Number (Optional)
                </Label>{" "}
                {/* Added text-sm */}
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Your phone number"
                  className="h-9" /* Reduced height */
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
            </div>
            <div className="flex items-start space-x-2 mt-1">
              {" "}
              {/* Added mt-1 */}
              <div className="mt-0.5">
                {" "}
                {/* Changed from mt-1 to mt-0.5 */}
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={values.agreeTerms}
                  onCheckedChange={(checked) => setFieldValue("agreeTerms", checked)}
                  className="h-4 w-4" /* Specified size */
                />
              </div>
              <div>
                <Label htmlFor="agreeTerms" className="text-xs font-normal">
                  {" "}
                  {/* Changed from text-sm to text-xs */}I agree to the{" "}
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
                  className="text-xs text-[#D22630]" /* Reduced to text-xs */
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D22630] hover:bg-[#B01F28] text-white h-9 text-sm" /* Added h-9 and text-sm */
              disabled={isSubmitting}
            >
              <UserPlus className="mr-2 h-3.5 w-3.5" /> {/* Reduced from h-4 w-4 to h-3.5 w-3.5 */}
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="relative py-1">
        {" "}
        {/* Added py-1 to reduce height */}
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or</span>
        </div>
      </div>
      <div className="text-center text-xs">
        {" "}
        {/* Changed from text-sm to text-xs */}
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

