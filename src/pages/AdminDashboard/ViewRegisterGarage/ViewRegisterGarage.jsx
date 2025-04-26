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
import { Loading } from "@/components/Loading";

export const ViewRegisterGarage = () => {
  const listRegisterGarage = useGetRegisterGarages();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/adminDashboard/viewRegisterGarage/${id}`);
  };
  if (listRegisterGarage.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      <div className=" px-2 py-1 flex justify-center items-center text-sm font-medium">
        Register Garage
      </div>
      <div className=" w-full flex flex-col gap-y-3">
        <Table>
          <TableCaption>A list of garage register.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Garage Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listRegisterGarage.data.map((item, index) => (
              <Row
                index={index}
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
