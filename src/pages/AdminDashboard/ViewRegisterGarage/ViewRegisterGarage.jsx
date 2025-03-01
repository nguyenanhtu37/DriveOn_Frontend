import { AlignCenter, ArrowDownUp, Plus, Search } from "lucide-react";
import { Row } from "../components/Row";
import { useGetRegisterGarages } from "@/app/stores/entity/garage";
import { formatDate } from "@/lib/formatDate";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export const ViewRegisterGarage = () => {
  const listRegisterGarage = useGetRegisterGarages();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/adminDashboard/viewRegisterGarage/${id}`);
  };
  if (listRegisterGarage.isLoading) return <div>Loading...</div>;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" px-2 py-1 flex justify-center items-center text-sm font-medium">
        Register Garage
      </div>
      <div className=" w-full flex flex-col gap-y-3">
        <div className=" w-full p-2 flex items-center justify-between bg-blue-50 bg-opacity-55 rounded-lg ">
          <div className=" flex gap-x-2 items-center justify-start">
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <Plus size={20} />
            </div>
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <AlignCenter size={20} />
            </div>
            <div className=" w-7 h-7 flex items-center cursor-pointer hover:opacity-75">
              <ArrowDownUp size={20} />
            </div>
          </div>

          <div className=" flex items-center gap-1 px-2 py-1 max-w-[160px] w-full rounded-xl bg-white ring-1 ring-black ">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search garage"
              className=" text-xs w-full h-full bg-transparent outline-none"
              // onChange={handleSearchGarage}
            />
          </div>
        </div>
        <Table>
          <TableCaption>A list of garage register.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Garage Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listRegisterGarage.data.map((item) => (
              <Row
                key={item._id}
                id={item._id}
                image={item.user[0].avatar}
                username={item.user[0].name}
                garage={item.name}
                address={item.address}
                date={formatDate(item.createdAt)}
                status={item.status}
                onClick={() => handleClick(item._id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
