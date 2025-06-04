import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Mail, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ReviewStep({ formData, files, progressList }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review all details before submitting your garage registration
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">{formData.name}</h4>
              <p className="text-sm text-muted-foreground">Garage Name</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{formData.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {formData.openTime} - {formData.closeTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {formData.openDays?.map((day) => (
                  <Badge
                    key={day.value}
                    variant="secondary"
                    className="text-xs"
                  >
                    {day.value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Location & Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{formData.address}</span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {formData.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Images ({files.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
                {files.map((file) => (
                  <div key={file.name} className=" rounded border">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      className="size-32 object-cover"
                    />
                    <Progress value={progressList[file.name]} className="h-1" />
                    {progressList[file.name] !== undefined &&
                      progressList[file.name] < 100 && (
                        <div className="absolute bottom-2 left-2 right-2"></div>
                      )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
