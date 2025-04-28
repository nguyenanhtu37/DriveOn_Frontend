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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ViewRegisterGarage = () => {
  const listRegisterGarage = useGetRegisterGarages();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/admin/viewRegisterGarage/${id}`);
  };
  if (listRegisterGarage.isLoading) return <Loading />;
  return (
    <div className="w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Garage Registration List
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage garage Registration in the system.
          </p>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};
