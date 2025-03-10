import React from "react";

import { Button } from "@/components/ui/button";
import { useApproveGarage, useRejectGarage } from "@/app/stores/entity/garage";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const Cell = ({ children }) => {
  return (
    <div className=" px-[12px] py-[11px] flex items-center text-xs">
      {children}
    </div>
  );
};
export const Row = ({
  id,
  image,
  username,
  garage,
  address,
  date,
  status,
  onClick,
}) => {
  const { mutate: approveGarage } = useApproveGarage();
  const { mutate: rejectGarage } = useRejectGarage();
  const handleApprove = () => {
    approveGarage(id);
  };
  const handleReject = () => {
    rejectGarage(id);
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
    <TableRow>
      <TableCell className="font-medium cursor-pointer" onClick={onClick}>
        INV001
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
            onClick={handleApprove}
            variant="ghost"
            className=" text-green-500 hover:text-green-600 font-semibold p-1"
          >
            <Check className=" h-4 w-4" /> Approve
          </Button>
          <Button
            onClick={handleReject}
            variant="ghost"
            className="font-semibold text-red-500 hover:text-red-600 p-1"
          >
            <X className=" h-4 w-4" /> Reject
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
