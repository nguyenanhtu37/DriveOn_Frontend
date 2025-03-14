"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { carOwnerSchema } from "../../schema/carOwnerSchema"
import { useAuth } from "../../common/hooks/useAuth"
import InputField from "../ui/InputField"
import SubmitButton from "./SubmitButton"

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(carOwnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  const { handleSignup, error: authError, success } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const submitData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        roles: ["carowner"],
      }
      await handleSignup(submitData)
    } catch (err) {
      console.error("Submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {authError && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{authError}</div>}

      {success && <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          register={register("name")}
          error={errors.name}
        />

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          register={register("phone")}
          error={errors.phone}
        />
      </div>

      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        register={register("email")}
        error={errors.email}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          register={register("password")}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>

      <div className="mt-2">
        <SubmitButton text="Sign Up" isLoading={isLoading} disabled={!isValid} />
      </div>
    </form>
  )
}

export default SignUpForm

