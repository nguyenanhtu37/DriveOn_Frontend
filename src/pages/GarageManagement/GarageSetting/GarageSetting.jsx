"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calendar,
  Edit2,
  Save,
  X,
  Star,
  Tag,
  CheckCircle,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useGetGarageDetail,
  useUpdateGarageInformation,
} from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";
import { useParams } from "react-router-dom";
import useUpload from "@/app/services/Cloudinary/upload";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatDate";
import { useGetGeocode } from "@/app/stores/entity/distance-matrix";
import Select from "react-tailwindcss-select";
const days = [
  { value: "Sunday", label: "☀️ Sunday" },
  { value: "Monday", label: "🌙 Monday" },
  { value: "Tuesday", label: "☁️ Tuesday" },
  { value: "Wednesday", label: "🌧️ Wednesday" },
  { value: "Thursday", label: "⚡ Thursday" },
  { value: "Friday", label: "❄️ Friday" },
  { value: "Saturday", label: "💨 Saturday" },
];
export default function GarageSetting() {
  const { garageId } = useParams();
  const garage = useGetGarageDetail(garageId); // Assuming you have a way to get the garage ID from the URL or context
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const inputImageRef = useRef(null);
  const mutation = useUpdateGarageInformation();
  const getLocation = useGetGeocode();

  const { files, handleFileChange, handleUpload, handleRemove } = useUpload();
  const [images, setImages] = useState([]);

  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((img) => img !== image));
    setActiveImageIndex(0);
  };
  useEffect(() => {
    if (garage.isSuccess) {
      setCurrentData(garage.data);
      setImages(garage.data.interiorImages);
    }
  }, [garage.data, garage.isSuccess]);

  const handleInputChange = (field, value) => {
    setCurrentData({
      ...currentData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    console.log("Saving data:", currentData);
    let imagesUpload = [];
    if (files.length > 0) {
      imagesUpload = await handleUpload(files);
    }

    let location = currentData.location;
    let address = currentData.address;
    if (currentData.address !== garage.data.address) {
      try {
        const res = await getLocation.mutateAsync(currentData.address);
        console.log("Geocode Response:", res);
        const { lat, lng } = res.result[0].geometry.location;
        location = {
          type: "Point",
          coordinates: [lng, lat],
        };
        address = res.result[0].formatted_address;
      } catch (error) {
        toast({
          title: "Error fetching geocode",
          description: "Please check the address and try again.",
          variant: "destructive",
        });
        console.error("Error fetching geocode:", error);
        return;
      }
    }
    mutation.mutate(
      {
        id: garageId,
        data: {
          ...currentData,
          interiorImages: [...images, ...imagesUpload],
          location,
          address,
        },
      },
      {
        onSuccess: () => {
          garage.refetch();
          toast({
            title: "Garage information updated successfully",
            duration: 2000,
          });
        },
        onError: (error) => {
          console.log(error);
          setCurrentData(garage.data); // Reset to original data on error
          toast({
            variant: "destructive",
            title: "Error updating garage information",
            description: error.response.data.error,
            duration: 2000,
          });
        },
      }
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setCurrentData(garage.data);
    setImages(garage.data.interiorImages);
    setIsEditing(false);
  };

  if (garage.isLoading || !currentData) {
    return <Loading />; // Handle loading state
  }

  return (
    <div className=" mx-auto p-7">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{currentData.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{currentData.address}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" /> Edit Information
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Main info */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      {isEditing ? (
                        <Input
                          value={currentData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-base">{currentData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={currentData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-base">{currentData.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={currentData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-base">{currentData.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tag</label>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                        <Badge variant="outline" className="capitalize">
                          {currentData.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
                      {isEditing ? (
                        <Textarea
                          value={currentData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-base">{currentData.address}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <div className="flex items-start">
                      <FileText className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
                      {isEditing ? (
                        <Textarea
                          value={currentData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          rows={4}
                        />
                      ) : (
                        <p className="text-base">{currentData.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isEditing && "h-[400px]"}`}>
                <CardHeader>
                  <CardTitle>Operating Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Operating Days
                    </label>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {!isEditing ? (
                        currentData.operating_days.map((day, index) => (
                          <Badge key={index} variant="secondary">
                            {day}
                          </Badge>
                        ))
                      ) : (
                        <Select
                          value={days.filter((day) =>
                            currentData.operating_days.includes(day.value)
                          )}
                          onChange={(value) => {
                            const selectedDays = value.map((day) => day.value);
                            handleInputChange("operating_days", selectedDays);
                          }}
                          options={days}
                          isMultiple={true}
                          primaryColor="black"
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Open Time</label>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            type="time"
                            value={currentData.openTime}
                            onChange={(e) =>
                              handleInputChange("openTime", e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-base">{currentData.openTime}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Close Time</label>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            type="time"
                            value={currentData.closeTime}
                            onChange={(e) =>
                              handleInputChange("closeTime", e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-base">{currentData.closeTime}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Interior Images</CardTitle>
                  <CardDescription>
                    Gallery of garage interior photos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {images.length > 0 || files.length > 0 ? (
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                        <img
                          src={images[activeImageIndex] || "/placeholder.svg"}
                          alt={`Interior ${activeImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {isEditing && (
                          <div
                            className=" absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer hover:shadow-md flex justify-center items-center"
                            onClick={() => {
                              handleDeleteImage(images[activeImageIndex]);
                            }}
                          >
                            <X size={12} />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 relative ${
                              index === activeImageIndex
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isEditing && (
                              <div
                                className=" absolute top-1 right-1 p-1 bg-white rounded-full cursor-pointer hover:shadow-md flex justify-center items-center"
                                onClick={() => {
                                  handleDeleteImage(img);
                                }}
                              >
                                <X size={10} />
                              </div>
                            )}
                          </div>
                        ))}
                        {files.map((file) => (
                          <div
                            key={file}
                            className=" w-20  rounded-md overflow-hidden cursor-pointer border-2 relative"
                          >
                            <img
                              key={file}
                              src={URL.createObjectURL(file)}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className=" absolute top-1 right-1 p-1 bg-white rounded-full cursor-pointer hover:shadow-md flex justify-center items-center"
                              onClick={() => {
                                handleRemove(file);
                              }}
                            >
                              <X size={10} />
                            </div>
                          </div>
                        ))}
                        {isEditing && (
                          <div className="w-20 h-20 rounded-md border-2 border-dashed border-muted flex items-center justify-center cursor-pointer">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => inputImageRef.current.click()}
                            >
                              Upload
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => inputImageRef.current.click()}
                    >
                      Upload
                    </Button>
                  ) : (
                    <p className="text-muted-foreground">
                      No interior images available
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>
                    Coordinates: {currentData.location.coordinates[1]},{" "}
                    {currentData.location.coordinates[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps?q=${currentData.location.coordinates[1]},${currentData.location.coordinates[0]}&z=15&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Status and metadata */}
        <div className="space-y-6 pt-[58px]">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {currentData.status.map((status, index) => (
                    <Badge key={index} className="capitalize">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{currentData.ratingAverage || "No ratings yet"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentData.user.map((user, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono">{currentData._id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{formatDate(currentData.createdAt)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated:</span>
                <span>{formatDate(currentData.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <input
        id="file"
        type="file"
        multiple
        placeholder="File"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={inputImageRef}
      />
    </div>
  );
}
