"use client"

import { useAuth } from "../../common/hooks/useAuth"
import InputField from "../ui/InputField"
import SubmitButton from "./SubmitButton"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newPasswordSchema } from "../../schema/forgotPasswordSchema"
import { useSearchParams } from "react-router-dom"

const NewPasswordForm = () => {
  const { handleResetPassword, isLoading, error, success } = useAuth()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmit = async (data) => {
    if (!token) {
      console.error("No reset token provided")
      return
    }
    try {
      await handleResetPassword(token, data.password)
    } catch (err) {
      console.error("Password reset failed:", err)
    }
  }

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          register={register("password")}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

        {success && <div className="p-3 rounded-md bg-green-100 text-green-700 text-sm">{success}</div>}

        {!token && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            No reset token provided. Please use the link from your email.
          </div>
        )}

        <div className="pt-2">
          <SubmitButton isLoading={isLoading} disabled={!token} variant="primary" size="md">
            Set New Password
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default NewPasswordForm

