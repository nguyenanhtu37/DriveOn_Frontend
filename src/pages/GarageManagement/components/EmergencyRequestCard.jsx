import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangle,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Car,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, formatTime, formatTimeAgo } from "@/libs/date-ultis";

export function EmergencyRequestCard({
  data,
  onAccept,
  onDismiss,
  isLoading = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const openMapLink = () => {
    const [lng, lat] = data.location.coordinates;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, "_blank");
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        "border-l-4 border-l-red-500",
        "hover:shadow-lg"
      )}
    >
      <EmergencyCardHeader
        data={data}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />

      <CardContent className="p-4 pt-4 space-y-4">
        <LocationSection data={data} onOpenMap={openMapLink} />
        <DescriptionSection description={data.description} />

        {isExpanded && <ExpandedDetails data={data} />}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <Separator />
        <ActionButtons
          onAccept={onAccept}
          onDismiss={onDismiss}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
}

function EmergencyCardHeader({ data, isExpanded, onToggleExpand }) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Emergency Rescue Request
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs bg-white">
                <Clock className="h-3 w-3 mr-1" />
                {formatTimeAgo(data.createdAt)}
              </Badge>
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-red-100"
          onClick={onToggleExpand}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function LocationSection({ data, onOpenMap }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-blue-100 p-2 rounded-full shrink-0 mt-1">
        <MapPin className="h-4 w-4 text-blue-600" />
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Location</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={onOpenMap}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Map
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open in Google Maps</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-gray-600">{data.address}</p>
        <div className="text-xs text-gray-500">
          Coordinates: {data.location.coordinates[1]},{" "}
          {data.location.coordinates[0]}
        </div>
      </div>
    </div>
  );
}

function DescriptionSection({ description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-1">
        <Car className="h-4 w-4 text-amber-600" />
      </div>
      <div className="space-y-1 flex-1">
        <h4 className="text-sm font-medium text-gray-700">Issue Description</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
          {description || "No description provided"}
        </p>
      </div>
    </div>
  );
}

function ExpandedDetails({ data }) {
  return (
    <>
      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Request ID" value={data._id} />
        <DetailItem label="Session ID" value={data.sessionId} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-gray-500">Created At</h4>
          <p className="text-sm">
            {formatTime(data.createdAt)} • {formatDate(data.createdAt)}
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-gray-500">Status</h4>
          <Badge variant={data.isAccepted ? "default" : "secondary"}>
            {data.isAccepted ? "Accepted" : "Pending"}
          </Badge>
        </div>
      </div>

      <ImagesSection images={data.images} />
    </>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="space-y-1">
      <h4 className="text-xs font-medium text-gray-500">{label}</h4>
      <p className="text-sm font-mono bg-gray-50 p-1 rounded border border-gray-100 overflow-hidden text-ellipsis">
        {value}
      </p>
    </div>
  );
}

function ImagesSection({ images }) {
  if (images && images.length > 0) {
    return (
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-500">Images</h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img || "/placeholder.svg"}
              alt={`Emergency image ${idx + 1}`}
              className="h-20 w-20 object-cover rounded-md border border-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md border border-dashed border-gray-200">
      <div className="flex flex-col items-center text-gray-400">
        <ImageIcon className="h-8 w-8 mb-2" />
        <p className="text-xs">No images attached</p>
      </div>
    </div>
  );
}

function ActionButtons({ onAccept, onDismiss, isLoading }) {
  return (
    <div className="flex gap-3 w-full">
      <Button
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        onClick={onAccept}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </div>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Accept Request
          </>
        )}
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-gray-200 hover:bg-gray-50 text-gray-700"
        onClick={onDismiss}
      >
        <X className="h-4 w-4 mr-2" />
        Dismiss
      </Button>
    </div>
  );
}
