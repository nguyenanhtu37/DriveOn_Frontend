import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const ResultItem = ({ item }) => {
  return (
    <Card className=" overflow-hidden cursor-pointer hover:bg-box-hover bg-white transition-shadow duration-200 rounded-none w-full">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-4">
            <div className="h-16 w-16 relative rounded-md overflow-hidden border">
              <img
                src={item.image || "/placeholder.svg?height=64&width=64"}
                alt={item.name}
                className="size-16 object-cover"
              />
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg truncate">{item.name}</h3>
              {typeof item.isOpen !== "undefined" && (
                <Badge
                  variant={item.isOpen ? "success" : "secondary"}
                  className="ml-2 flex-shrink-0"
                >
                  {item.isOpen ? "Mở cửa" : "Đóng cửa"}
                </Badge>
              )}
            </div>

            {item.address ? (
              <div className="flex items-start mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                <p className="text-sm truncate">{item.address}</p>
              </div>
            ) : (
              <Badge
                variant={item.isOpen ? "success" : "secondary"}
                className=" flex-shrink-0"
              >
                Service
              </Badge>
            )}
            {item.description && (
              <p className="text-xs mt-2 text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
