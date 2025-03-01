// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "@/components/ui/use-toast";
// import { Loader2, Save } from "lucide-react";

// const profileFormSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   phone: z.string().optional(),
//   bankAccount: z.string().optional(),
//   givenName: z.string().optional(),
//   familyName: z.string().optional(),
//   locale: z.string().optional(),
// });

// export default function ProfileForm() {
//   const [isLoading, setIsLoading] = useState(false);

//   // In a real app, this would come from your authentication system or API
//   const defaultValues = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     bankAccount: "123456789",
//     givenName: "John",
//     familyName: "Doe",
//     locale: "en-US",
//   };

//   const form = useForm({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   function onSubmit(data) {
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       console.log(data);
//       setIsLoading(false);
//       toast({
//         title: "Profile updated",
//         description: "Your profile has been updated successfully.",
//       });
//     }, 1000);
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Profile Information</CardTitle>
//         <CardDescription>Update your personal information and preferences</CardDescription>
//       </CardHeader>
//       <Tabs defaultValue="personal">
//         <CardContent className="pt-6">
//           <TabsList className="mb-6">
//             <TabsTrigger value="personal">Personal Info</TabsTrigger>
//             <TabsTrigger value="account">Account</TabsTrigger>
//             <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
//             <TabsTrigger value="garages">Garages</TabsTrigger>
//           </TabsList>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <TabsContent value="personal" className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your full name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your email address" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your phone number" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="locale"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Preferred Language</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select a language" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="en-US">English (US)</SelectItem>
//                             <SelectItem value="en-GB">English (UK)</SelectItem>
//                             <SelectItem value="fr-FR">French</SelectItem>
//                             <SelectItem value="de-DE">German</SelectItem>
//                             <SelectItem value="es-ES">Spanish</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="givenName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your first name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="familyName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your last name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </TabsContent>

//               <TabsContent value="account" className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="bankAccount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Bank Account</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Your bank account number" {...field} />
//                         </FormControl>
//                         <FormDescription>This is used for payments and withdrawals.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div>
//                     <FormLabel>Account Status</FormLabel>
//                     <div className="flex items-center h-10 mt-2">
//                       <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                         Active
//                       </span>
//                     </div>
//                     <FormDescription>Your current account status.</FormDescription>
//                   </div>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h3 className="text-lg font-medium mb-4">Security</h3>
//                   <Button variant="outline" type="button">
//                     Change Password
//                   </Button>
//                 </div>
//               </TabsContent>

//               <TabsContent value="vehicles" className="space-y-6">
//                 <div className="rounded-md bg-muted p-8 text-center">
//                   <h3 className="text-lg font-medium mb-2">No Vehicles Added</h3>
//                   <p className="text-muted-foreground mb-4">You have not added any vehicles to your profile yet.</p>
//                   <Button type="button">Add Vehicle</Button>
//                 </div>
//               </TabsContent>

//               <TabsContent value="garages" className="space-y-6">
//                 <div className="rounded-md bg-muted p-8 text-center">
//                   <h3 className="text-lg font-medium mb-2">No Garages Added</h3>
//                   <p className="text-muted-foreground mb-4">You haven't added any garages to your profile yet.</p>
//                   <Button type="button">Add Garage</Button>
//                 </div>
//               </TabsContent>

//               <CardFooter className="px-0 pt-6 border-t flex justify-end">
//                 <Button type="submit" disabled={isLoading}>
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" />
//                       Save Changes
//                     </>
//                   )}
//                 </Button>
//               </CardFooter>
//             </form>
//           </Form>
//         </CardContent>
//       </Tabs>
//     </Card>
//   );
// }