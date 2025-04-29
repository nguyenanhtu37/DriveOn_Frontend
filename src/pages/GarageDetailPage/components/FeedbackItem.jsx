import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import Rating from "react-rating";

const FeedbackItem = ({ feeback }) => {
  return (
    <div className="flex flex-col w-full gap-y-3 ">
      <div className="flex flex-row items-center gap-4 pb-2 pt-6">
        <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
          <AvatarImage src={feeback.user.avatar || "/placeholder.svg"} />
        </Avatar>
        <div className="flex flex-col">
          <div className="font-medium text-lg">{feeback.user.name}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="rounded-full font-normal">
              {/* {feeback.service.name} */}
            </Badge>
            <span className="text-xs">•</span>
            <span className="text-xs">{feeback.garage.name}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <Rating
            initialRating={feeback.rating}
            emptySymbol={
              <img src="/public/star-empty.png" className="size-2" />
            }
            fullSymbol={<img src="/public/star-full.png" className="size-2" />}
            readonly
          />
          <span className="text-sm text-gray-500">
            {formatDate(feeback.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
