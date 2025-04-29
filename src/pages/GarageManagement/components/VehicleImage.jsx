import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function VehicleImage({ image }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="mt-4 p-0 h-auto text-blue-600">
          View car picture
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 rounded-md overflow-hidden border-none"
        hiddenClose={true}
      >
        <img src={image} className=" w-full object-cover" />
      </DialogContent>
    </Dialog>
  );
}
