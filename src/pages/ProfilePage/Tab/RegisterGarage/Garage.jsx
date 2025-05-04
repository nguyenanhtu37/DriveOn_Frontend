import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  CheckCircle,
  Tag,
  Edit,
  Save,
  X,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUpdateRegisterGarage } from "@/app/stores/entity/garage";

export const Garage = ({ garageData }) => {
  const garageMutation = useUpdateRegisterGarage();
  const [isEditing, setIsEditing] = useState(false);
  const [garage, setGarage] = useState(garageData);

  const [formData, setFormData] = useState({ ...garage });
  const [activeTab, setActiveTab] = useState("info");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDayToggle = (day) => {
    const updatedDays = formData.operating_days.includes(day)
      ? formData.operating_days.filter((d) => d !== day)
      : [...formData.operating_days, day];

    setFormData({
      ...formData,
      operating_days: updatedDays,
    });
  };

  const handleSave = () => {
    setGarage(formData);
    garageMutation.mutate(
      { id: garage._id, garage: formData },
      {
        onSuccess: () => {
          toast({
            title: "Garage updated successfully",
            description: "Garage information has been updated",
            duration: 2000,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Garage update failed",
            description: "Failed to update garage information",
            duration: 2000,
          });
        },
      }
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...garage });
    setIsEditing(false);
  };

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

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Card className="w-full  mx-auto">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-start gap-x-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2 ">
                <Label htmlFor="name">Garage Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            ) : (
              <>
                <CardTitle className="text-2xl font-bold">
                  {garage.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {garage.description}
                </CardDescription>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                {getStatusBadge(garage.status)}
                <Badge variant="outline">{garage.tag}</Badge>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" /> Hủy
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Lưu
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs
          defaultValue="info"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="info">Basic Information</TabsTrigger>
            <TabsTrigger value="hours">Hours of Operation</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h3 className="font-medium">Address</h3>
                    {isEditing ? (
                      <div className="space-y-2 mt-1">
                        <Textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {garage.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tọa độ: {garage.location.coordinates[1]},{" "}
                          {garage.location.coordinates[0]}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h3 className="font-medium">Phone</h3>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {garage.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h3 className="font-medium">Email</h3>
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {garage.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h3 className="font-medium">Owner</h3>

                    <p className="text-sm text-muted-foreground">
                      {garage.user[0].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {garage.user[0].phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {garage.user[0].email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h3 className="font-medium">Type</h3>
                    <p className="text-sm text-muted-foreground">
                      {garage.tag}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Registration date</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(garage.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-medium">Opening hours</h3>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="openTime">Opening hours</Label>
                        <Input
                          id="openTime"
                          name="openTime"
                          type="time"
                          value={formData.openTime}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="closeTime">Closing hours</Label>
                        <Input
                          id="closeTime"
                          name="closeTime"
                          type="time"
                          value={formData.closeTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {garage.openTime} - {garage.closeTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-medium">Day of Operation</h3>
                  {isEditing ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                      {weekdays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={formData.operating_days.includes(day)}
                            onCheckedChange={() => handleDayToggle(day)}
                          />
                          <Label htmlFor={day}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {garage.operating_days.map((day) => (
                        <Badge key={day} variant="outline">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Interior images</h3>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Add image
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.interiorImages.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-md border relative"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Interior image ${index + 1}`}
                      className="h-auto w-full object-cover aspect-video"
                    />
                    {isEditing && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => {
                          const newImages = [...formData.interiorImages];
                          newImages.splice(index, 1);
                          setFormData({
                            ...formData,
                            interiorImages: newImages,
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {isEditing && (
        <CardFooter className="border-t flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
