// import { Suspense, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfileForm from "@/components/profile/profile-form";
// import ProfileHeader from "@/components/profile/profile-header";
// import ProfileSkeleton from "@/components/profile/profile-skeleton";
// import { useAuth } from "@/common/hooks/useAuth";

// export default function ProfilePage() {
//   const { isLoggedIn } = useAuth(); // Assume useAuth provides this
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login");
//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div className="container mx-auto py-10 px-4 md:px-6">
//       <h1 className="text-3xl font-bold mb-6">My Profile</h1>
//       <Suspense fallback={<ProfileSkeleton />}>
//         <div className="grid gap-6">
//           <ProfileHeader />
//           <ProfileForm />
//         </div>
//       </Suspense>
//     </div>
//   );
// }