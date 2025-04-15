import {
  useChangePassword,
  useGetProfile,
  useUpdateProfile,
} from "@/app/stores/entity/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { passwordSchema, userSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const Setting = () => {
  const profile = useGetProfile();

  const updateProfile = useUpdateProfile();

  const changePassword = useChangePassword();

  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onChangePassword = (data) => {
    const changeData = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    changePassword.mutate(changeData, {
      onSuccess: () => {
        toast({
          title: "Password changed successfully",
          description: "Your password has been changed.",
          duration: 2000,
        });
        passwordForm.reset();
      },
      onError: () => {
        toast({
          title: "Error changing password",
          description: "Your current password is incorrect.",
          variant: "destructive",
          duration: 2000,
        });
      },
    });
  };

  const onSubmit = (data) => {
    const updateData = {
      name: data.name,
      phone: data.phone,
    };
    updateProfile.mutate(updateData, {
      onSuccess: () => {
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated.",
          duration: 2000,
        });
        profile.refetch();
      },
      onError: (error) => {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  useEffect(() => {
    if (profile.data) {
      userForm.reset({
        name: profile.data.name,
        email: profile.data.email,
        phone: profile.data.phone,
      });
    }
  }, [profile.data, userForm]);

  return (
    <TabsContent value="settings" className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>

      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your account details and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={userForm.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...field}
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    {userForm.formState.errors.name && (
                      <span className="text-sm text-red-400">
                        {userForm.formState.errors.name.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={true}
                  value={profile.data.email}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <Controller
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...field}
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    {userForm.formState.errors.phone && (
                      <span className="text-sm text-red-400">
                        {userForm.formState.errors.name.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <Button className="mt-2 bg-red-500 hover:bg-red-600">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>
            Manage your password and security settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      {...field}
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <span className="text-sm text-red-400">
                        {passwordForm.formState.errors.currentPassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...field}
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <span className="text-sm text-red-400">
                        {passwordForm.formState.errors.newPassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...field}
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <span className="text-sm text-red-400">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-200 text-red-500 hover:bg-red-50 border border-red-200 mt-4"
            >
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
