import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownUp, Circle, Plus, Search } from "lucide-react";
import AddStaff from "./AddStaff";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useDisableStaff,
  useEnableStaff,
  useGetStaffs,
} from "@/app/stores/entity/staff";
import { Switch } from "@/components/ui/switch";
import { Loading } from "@/components/Loading";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const Staff = () => {
  const { garageId } = useParams();
  const staffs = useGetStaffs(garageId);
  const enabledStaff = useEnableStaff();
  const disabledStaff = useDisableStaff();

  const handleSwitch = (staffId, status) => {
    if (status == "active") {
      disabledStaff.mutate({ garageId: garageId, staffId });
    } else {
      enabledStaff.mutate({ garageId: garageId, staffId });
    }
  };

  if (staffs.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" w-full p-2 flex items-center justify-between bg-blue-50 bg-opacity-55 rounded-lg ">
        <div className=" flex gap-x-2 items-center justify-start">
          <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Plus size={20} />
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start">
                    <p>Add Staff</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent>
                <AddStaff />
              </DialogContent>
            </Dialog>
          </div>

          <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
            <ArrowDownUp size={20} />
          </div>
        </div>

        {/* <div className=" flex items-center gap-1 px-2 py-1 max-w-[260px] w-full rounded-xl bg-white ring-1 ring-black ">
          <Search size={16} />
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search garage"
            className=" text-xs w-full h-full bg-transparent px-2 py-1 outline-none"
          />
        </div> */}
      </div>
      <Table className=" border border-gray-200 shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-center">Enabled/Disabled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffs.data?.map((staff, index) => (
            <TableRow key={staff._id}>
              <TableCell className="w-[100px]">{index}</TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>
                <Input type="password" value="123456" className="" disabled />
              </TableCell>
              <TableCell className="text-center">
                <Switch
                  checked={staff.status === "active"}
                  onCheckedChange={() => handleSwitch(staff._id, staff.status)}
                  className="data-[state=checked]:bg-green-300 data-[state=unchecked]:bg-input"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
