import {
  useDisableUser,
  useEnableUser,
  useGetALlUser,
} from "@/app/stores/entity/user";
import { Loading } from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const UserManagement = () => {
  const [page, setPage] = useState(1);
  const allUser = useGetALlUser(page);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= allUser.data?.totalPages) {
      setPage(newPage);
    }
  };

  const enableUser = useEnableUser();
  const disableUser = useDisableUser();

  const handleSwitch = (userId, status) => {
    if (status === "active") {
      disableUser.mutate(userId, {
        onSuccess: () => {
          allUser.refetch();
          toast({
            title: "User Disabled",
            description: "User has been disabled successfully.",
            variant: "default",
            duration: 2000,
          });
        },
        onError: (error) => {
          toast({
            title: "Error Disabling User",
            description: error.response?.data?.message || "An error occurred.",
            variant: "destructive",
            duration: 2000,
          });
        },
      });
    } else {
      enableUser.mutate(userId, {
        onSuccess: () => {
          allUser.refetch();
          toast({
            title: "User Enabled",
            description: "User has been enabled successfully.",
            variant: "default",
            duration: 2000,
          });
        },
        onError: (error) => {
          toast({
            title: "Error Enabling User",
            description: error.response?.data?.message || "An error occurred.",
            duration: 2000,
            variant: "destructive",
          });
        },
      });
    }
  };

  if (allUser.isLoading) return <Loading />;

  return (
    <div className="w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage users and their roles in the system.
          </p>
        </CardHeader>
        <CardContent>
          <Table className=" border border-gray-200 shadow-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-bold">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Enabled/Disabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUser.data?.users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="w-[100px] font-semibold">
                    {user._id.slice(0, 6)}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {user.roles
                      .map((role) => role.roleName.toUpperCase())
                      .join(", ")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={user.status === "active"}
                      onCheckedChange={() =>
                        handleSwitch(user._id, user.status)
                      }
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

              {Array.from({ length: allUser.data.totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

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
