// "use client";

// import { useState } from "react";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// import { Upload, Camera } from "lucide-react";
// import { useAuth } from "@/common/hooks/useAuth"; // Adjust path to your useAuth hook

// export default function ProfileHeader() {
//   const { error: authError } = useAuth(); // Optional: for error handling
//   const [isUploading, setIsUploading] = useState(false);

//   // In a real app, this would come from your authentication system or API
//   const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     avatar: "/placeholder.svg?height=100&width=100",
//     status: "active",
//     emailVerified: true,
//     coinBalance: 500,
//     createdAt: new Date("2023-01-15"),
//   };

//   const handleAvatarUpload = () => {
//     setIsUploading(true);
//     // Simulate upload delay
//     setTimeout(() => {
//       setIsUploading(false);
//     }, 1500);
//   };

//   return (
//     <Card>
//       <CardContent className="p-6">
//         {authError && (
//           <div className="mb-4 text-red-600 text-sm">{authError}</div>
//         )}
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <div className="relative">
//             {/* <Avatar className="h-24 w-24">
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
//             </Avatar> */}
//             <Button
//               size="icon"
//               variant="secondary"
//               className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
//               onClick={handleAvatarUpload}
//               disabled={isUploading}
//             >
//               {isUploading ? <Camera className="h-4 w-4 animate-pulse" /> : <Upload className="h-4 w-4" />}
//             </Button>
//           </div>

//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl font-bold">{user.name}</h2>
//             <p className="text-muted-foreground">{user.email}</p>
//             {/* <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
//               <Badge variant={user.status === "active" ? "success" : "destructive"}>
//                 {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//               </Badge>
//               {user.emailVerified && <Badge variant="outline">Email Verified</Badge>}
//             </div> */}
//           </div>

//           <div className="flex flex-col items-center gap-2 bg-muted p-4 rounded-lg">
//             <span className="text-sm text-muted-foreground">Coin Balance</span>
//             <span className="text-2xl font-bold">{user.coinBalance}</span>
//             <Button variant="outline" size="sm">
//               Add Coins
//             </Button>
//           </div>
//         </div>

//         <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
//           <p>Member since {user.createdAt.toLocaleDateString()}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }