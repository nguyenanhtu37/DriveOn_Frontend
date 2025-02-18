import React from "react";

import { Button } from "@/components/ui/button";
import { useApproveGarage, useRejectGarage } from "@/app/stores/entity/garage";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Cell = ({ children }) => {
  return (
    <div className=" px-[12px] py-[11px] flex items-center text-xs">
      {children}
    </div>
  );
};
export const Row = ({ id, image, username, garage, address, date, status }) => {
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
      <TableCell className="font-medium">INV001</TableCell>
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
        <div className=" flex items-center gap-2">
          <Button
            onClick={handleApprove}
            className={cn(
              " bg-green-500 hover:bg-green-600",
              status === "approved" && "bg-green-300"
            )}
          >
            Approve
          </Button>
          <Button
            onClick={handleReject}
            className={cn(
              " bg-red-500 hover:bg-red-600",
              status === "rejected" && "bg-red-300"
            )}
          >
            Reject
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
