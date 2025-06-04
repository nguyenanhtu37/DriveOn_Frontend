import { Button } from "@/components/ui/button";
import { useApproveGarage, useRejectGarage } from "@/app/stores/entity/garage";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const Cell = ({ children }) => {
  return (
    <div className=" px-[12px] py-[11px] flex items-center text-xs">
      {children}
    </div>
  );
};

export const Row = ({
  index,
  id,
  image,
  username,
  garage,
  address,
  date,
  status,
  onClick,
}) => {
  const navigate = useNavigate();
  const { mutate: approveGarage } = useApproveGarage();
  const { mutate: rejectGarage } = useRejectGarage();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleApprove = () => {
    approveGarage(id, {
      onSuccess: () => {
        toast({
          title: "Garage approved successfully",
          description: "Garage has been approved.",
          duration: 2000,
        });
        navigate("/admin/viewExitsGarage");
      },
      onError: (error) => {
        toast({
          title: "Error approving garage",
          description: error.message,
          variant: "destructive",
        });
      },
    });
    setIsApproveDialogOpen(false);
  };

  const handleReject = () => {
    rejectGarage(id, {
      onSuccess: () => {
        toast({
          title: "Garage rejected",
          description: "Garage has been rejected.",
          duration: 2000,
        });
        navigate("/admin/viewExitsGarage");
      },
      onError: (error) => {
        toast({
          title: "Error rejecting garage",
          description: error.message,
          variant: "destructive",
          duration: 2000,
        });
      },
    });
    setIsRejectDialogOpen(false);
  };

  let statusClassName;
  if (status === "pending") {
    statusClassName = "text-yellow-200";
  } else if (status === "approved") {
    statusClassName = "text-green-300";
  } else {
    statusClassName = "text-red-300";
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-medium cursor-pointer" onClick={onClick}>
          {index + 1}
        </TableCell>
        <TableCell>
          <div className=" flex items-center flex-wrap justify-start gap-1">
            <img
              src={image}
              alt="user"
              className=" w-6 h-6 object-cover rounded-full"
            />
            <span className=" text-xs text-black">{username}</span>
          </div>
        </TableCell>
        <TableCell>{garage}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell className={statusClassName}>
          <Badge>{status}</Badge>
        </TableCell>
        <TableCell className={statusClassName}>
          <div className=" flex items-center gap-x-1 ">
            <Button
              onClick={() => setIsApproveDialogOpen(true)}
              variant="ghost"
              className=" text-green-500 hover:text-green-600 font-semibold p-1"
            >
              <Check className=" h-4 w-4" /> Approve
            </Button>
            <Button
              onClick={() => setIsRejectDialogOpen(true)}
              variant="ghost"
              className="font-semibold text-red-500 hover:text-red-600 p-1"
            >
              <X className=" h-4 w-4" /> Reject
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Garage Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this garage registration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{garage}</p>
                <p className="text-sm text-gray-500">{address}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApproveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleApprove}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Garage Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this garage registration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium">{garage}</p>
                <p className="text-sm text-gray-500">{address}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
