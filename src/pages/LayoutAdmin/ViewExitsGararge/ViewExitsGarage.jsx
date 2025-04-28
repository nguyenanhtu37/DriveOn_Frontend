import { useState } from "react";
import {
  useDisableGarage,
  useEnableGarage,
  useGetGarageExits,
} from "@/app/stores/entity/garage";
import { Loading } from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ViewExitsGarage = () => {
  const [page, setPage] = useState(1);
  const [keySearch, setKeySearch] = useState();
  const [keySearchInput, setKeySearchInput] = useState("");

  const garageExits = useGetGarageExits({ page, keySearch });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= garageExits.data?.totalPages) {
      setPage(newPage);
    }
  };
  const handleSearch = () => {
    setKeySearch(keySearchInput);
    setPage(1);
  };

  const enabled = useEnableGarage();
  const disabled = useDisableGarage();
  const toggleEnabled = (garage) => {
    const isEnabled = garage.status.includes("enabled");
    if (isEnabled) {
      disabled.mutate(garage._id);
    } else {
      enabled.mutate(garage._id);
    }
  };
  if (garageExits.isLoading) return <Loading />;
  return (
    <div className=" p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Garage Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage garages in the system.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start items-center gap-x-3 mb-6">
            <Input
              className=" w-[450px] "
              placeholder="Search Garage in system"
              onChange={(e) => setKeySearchInput(e.target.value)}
              value={keySearchInput}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="outline"
              className="w-[80px] hover:bg-gray "
              onClick={handleSearch}
            >
              <Search className="flex" />
            </Button>
          </div>
          <Table className=" border border-gray-200 shadow-sm ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-bold">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-center">Enabled/Disabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {garageExits.data?.garages.map((garage) => (
                <TableRow key={garage._id}>
                  <TableCell className="w-[100px] font-semibold">
                    {garage._id.slice(0, 6)}
                  </TableCell>
                  <TableCell>{garage.name}</TableCell>
                  <TableCell>{garage.address}</TableCell>
                  <TableCell>{garage.phone}</TableCell>
                  <TableCell>{garage.email}</TableCell>
                  <TableCell>{garage.status.join(", ")}</TableCell>
                  <TableCell className="text-end">
                    {garage.ratingAverage}⭐
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={garage.status.includes("enabled")}
                      onCheckedChange={() => toggleEnabled(garage)}
                      className="data-[state=checked]:bg-green-300 data-[state=unchecked]:bg-input"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>

              {Array.from(
                { length: garageExits.data.totalPages },
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={page === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};
