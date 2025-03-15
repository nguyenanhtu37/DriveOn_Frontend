"use client"

import { useAuth } from "../../common/hooks/useAuth"
import InputField from "../ui/InputField"
import SubmitButton from "./SubmitButton"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "../../schema/forgotPasswordSchema"

const ForgotPasswordForm = () => {
  const { handleRequestPasswordReset, isLoading, error, success } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data) => {
    try {
      await handleRequestPasswordReset(data.email)
    } catch (err) {
      console.error("Password reset request failed:", err)
    }
  }

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email address"
          register={register("email")}
          error={errors.email}
        />

        {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

        {success && <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm">{success}</div>}

        <div className="pt-2">
          <SubmitButton isLoading={isLoading} variant="primary" size="md">
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm

