import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
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
import { Pagination } from "../components/Pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Staff = () => {
  const { garageId } = useParams();

  const [isOpenForm, setIsOpenForm] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const enabledStaff = useEnableStaff();
  const disabledStaff = useDisableStaff();

  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState();

  const handleSelectedStaff = (staff) => {
    setSelectedStaff(staff);
    setIsOpenForm(true);
  };

  const handleSwitch = () => {
    if (selectedStaff.status == "active") {
      disabledStaff.mutate({ garageId: garageId, staffId: selectedStaff._id });
    } else {
      enabledStaff.mutate({ garageId: garageId, staffId: selectedStaff._id });
    }
    setIsOpenForm(false);
    setSelectedStaff(null);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const payload = {
    garageId: garageId,
    page: page,
  };

  const staffs = useGetStaffs(payload);

  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } =
    staffs.data.pagination || {};

  if (staffs.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" w-full p-2 flex items-center justify-between bg-blue-50 bg-opacity-55 rounded-lg ">
        <div className=" flex gap-x-2 items-center justify-start">
          <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <AddStaff setIsOpen={setIsOpen} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="w-full min-w-[800px] overflow-x-auto">
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
            {staffs.data?.data.map((staff, index) => (
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
                    onClick={() => handleSelectedStaff(staff)}
                    className="data-[state=checked]:bg-green-300 data-[state=unchecked]:bg-input"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />

      <Dialog open={isOpenForm} onOpenChange={setIsOpenForm}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Enable/Disable Staff</h2>
          </DialogHeader>
          <div className="">Do you want to enable or disable this staff?</div>
          <DialogFooter>
            <Button
              type="button"
              className=" py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={() => {
                setIsOpenForm(false);
                setSelectedStaff(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              type="submit"
              className=" py-2 "
              onClick={handleSwitch}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
