"use client";

import {
  useApproveGarage,
  useGetRegisterGarageDetail,
  useRejectGarage,
} from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  ExternalLink,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShieldX,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ViewRegisterGarageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: garage, isLoading } = useGetRegisterGarageDetail(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const approveGarage = useApproveGarage();
  const rejectGarage = useRejectGarage();

  const handleApprove = () => {
    approveGarage.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Garage approved successfully",
          description: `${garage.name} has been approved and is now active.`,
        });
        navigate("admin/viewExitsGarage");
      },
      onError: (error) => {
        toast({
          title: "Error approving garage",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleReject = () => {
    rejectGarage.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Garage rejected",
          description: `${garage.name} has been rejected.`,
        });
        setIsRejectDialogOpen(false);
        navigate("admin/viewExitsGarage");
      },
      onError: (error) => {
        toast({
          title: "Error rejecting garage",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) return <Loading />;

  const getStatusBadge = (status) => {
    switch (status) {
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200"
          >
            <X className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      case "disabled":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-600 border-gray-200"
          >
            <X className="mr-1 h-3 w-3" />
            Disabled
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-600 border-amber-200"
          >
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            <Check className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className=" mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/admin/viewRegisterGarage")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{garage.name}</h1>
            <p className="text-sm text-muted-foreground">
              Garage registration details
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {garage.status.map((status, index) => (
            <div key={index}>{getStatusBadge(status)}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="relative h-[300px] w-full bg-gradient-to-r from-rose-100 to-rose-200">
              {garage.interiorImages && garage.interiorImages.length > 0 ? (
                <img
                  src={
                    garage.interiorImages[selectedImage] || "/placeholder.svg"
                  }
                  alt="Garage interior"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-rose-500">No images available</p>
                </div>
              )}
            </div>

            {garage.interiorImages && garage.interiorImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto p-4 bg-gray-50 border-t">
                {garage.interiorImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-md overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-rose-500" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`thumbnail ${index + 1}`}
                      className="h-16 w-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <CardContent className="p-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="hours">Hours & Location</TabsTrigger>
                  <TabsTrigger value="owner">Owner</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                        <Info className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Description
                        </h3>
                        <p className="text-sm">
                          {garage.description || "No description provided"}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                        <Phone className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Contact Information
                        </h3>
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span>{" "}
                          {garage.phone}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Email:</span>{" "}
                          {garage.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hours" className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                        <MapPin className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Location
                        </h3>
                        <p className="text-sm">{garage.address}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            garage.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-xs text-rose-600 hover:underline"
                        >
                          View on Google Maps
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                        <Clock className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Working Hours
                        </h3>
                        <div className="flex gap-4 text-sm">
                          <p>
                            <span className="font-medium">Open:</span>{" "}
                            {garage.openTime}
                          </p>
                          <p>
                            <span className="font-medium">Close:</span>{" "}
                            {garage.closeTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                        <Calendar className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Operating Days
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {garage.operating_days.map((day, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-50 border-gray-200 text-gray-700"
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="owner" className="pt-6">
                  {garage.user && garage.user.length > 0 && (
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-sm">
                        <AvatarImage
                          src={garage.user[0].avatar || "/placeholder.svg"}
                          alt={garage.user[0].name}
                        />
                        <AvatarFallback className="bg-rose-100 text-rose-600">
                          {garage.user[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">
                          {garage.user[0].name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>{garage.user[0].email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-4 w-4" />
                          <span>{garage.user[0].phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg">Registration Summary</CardTitle>
              <CardDescription>Review and take action</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Registration Date
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(garage.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-medium capitalize">
                    {garage.status[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type</span>
                  <span className="text-sm font-medium capitalize">
                    {garage.tag}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Interior Images</span>
                  <span className="text-sm font-medium">
                    {garage.interiorImages?.length || 0}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Take Action</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={approveGarage.isPending}
                    onClick={handleApprove}
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Approve Garage
                  </Button>

                  <Dialog
                    open={isRejectDialogOpen}
                    onOpenChange={setIsRejectDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <ShieldX className="mr-2 h-4 w-4" />
                        Reject Garage
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Garage Registration</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to reject this garage
                          registration? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-md">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{garage.name}</p>
                            <p className="text-sm text-gray-500">
                              {garage.address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsRejectDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        disabled={approveGarage.isPending}
                        <Button variant="destructive" onClick={handleReject}>
                          Reject
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${garage.location.coordinates[1]},${garage.location.coordinates[0]}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  <MapPin className="inline-block h-4 w-4 mr-1" />
                  {garage.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
