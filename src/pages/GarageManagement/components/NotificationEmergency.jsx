"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  AlertTriangle,
  MapPin,
  Clock,
  ImageIcon,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const NotificationEmergency = ({ data, onClose, onAccepted }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const createdAtDate = new Date();
  const timeAgo = formatDistanceToNow(createdAtDate, {
    addSuffix: true,
  });
  if (!data) return null;

  return (
    <div
      className={`w-full transition-all duration-500 ease-in-out transform `}
    >
      <Card className={`backdrop-blur-xl bg-white/80 overflow-hidden `}>
        <div className="bg-gradient-to-r from-red-500 to-orange-500 h-1.5"></div>
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  New rescue request
                </h3>
                <p className="text-xs text-gray-500">{timeAgo}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm text-gray-700">{data.description}</p>
            </div>

            {/* Image */}
            {data.images && data.images.length > 0 && (
              <div className="relative">
                <div
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer ${
                    isImageExpanded ? "h-60" : "h-32"
                  }`}
                  onClick={() => setIsImageExpanded(!isImageExpanded)}
                >
                  <img
                    src={data.images[0]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center">
                    <Badge
                      className="mb-2 bg-black/50 hover:bg-black/60 backdrop-blur-sm text-white border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsImageExpanded(!isImageExpanded);
                      }}
                    >
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {isImageExpanded ? "Thu gọn" : "Phóng to"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">{data.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {data.location.coordinates[1]},{" "}
                  {data.location.coordinates[0]}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-700">
                {new Date(data.createdAt).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`${
                  data.isAccepted
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {data.isAccepted ? "Accepted" : "Not accepted"}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 bg-gray-50 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-200 bg-white hover:bg-gray-50"
              onClick={onClose}
            >
              Skip
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              onClick={onAccepted}
            >
              Accepts
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
