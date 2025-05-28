import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Star } from "lucide-react";

const FeedbackItem = ({
  avatar,
  name,
  services,
  rating,
  createdAt,
  content,
  ...props
}) => {
  return (
    <div className="border-b pb-6" {...props}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{name}</h3>
            {services && (
              <div className="">
                <span className="text-sm text-muted-foreground mb-1">
                  Services: {services}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <div className="flex mr-2">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-500"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {format(createdAt, "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default FeedbackItem;
