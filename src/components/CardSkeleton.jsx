import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const CardSkeleton = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col space-y-3 w-full", className)} {...props}>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default CardSkeleton;
