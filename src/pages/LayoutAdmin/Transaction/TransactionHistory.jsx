import { useState } from "react";
import { CalendarIcon, Filter, Search, SortDesc } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TransactionItem } from "../components/TransactionItem";
import { useGetTransactionForAdmin } from "@/app/stores/entity/transaction";
import { useGetSubscription } from "@/app/stores/entity/subscription";
import { Loading } from "react-daisyui";

// Sample transaction data

export const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    limit: 10,
    sortOrder: -1,
    date: undefined,
    search: undefined,
    subscription: undefined,
    status: "PAID",
  });
  const [dateRange, setDateRange] = useState(undefined);

  const transaction = useGetTransactionForAdmin(searchQuery);

  // Filter and sort transactions
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= transaction.data.pagination.pages) {
      setSearchQuery((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const subscription = useGetSubscription();

  return (
    <div className=" w-full p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Transactions History</CardTitle>
              <CardDescription>
                View and manage your transaction history
              </CardDescription>
            </div>
            {/* <Button variant="outline" className="self-start">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchQuery((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }));
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchQuery.date}
                    onSelect={(date) => {
                      setSearchQuery((prev) => ({
                        ...prev,
                        date: date,
                      }));
                      setDateRange(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select
                value={searchQuery.subscription}
                onValueChange={(value) => {
                  setSearchQuery((prev) => ({
                    ...prev,
                    subscription: value,
                  }));
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All Subscriptions</SelectItem>
                  {subscription.data.map((subscription) => (
                    <SelectItem key={subscription._id} value={subscription._id}>
                      {subscription.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={searchQuery.sortOrder}
                onValueChange={(value) => {
                  setSearchQuery((prev) => ({
                    ...prev,
                    sortOrder: value,
                  }));
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SortDesc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={-1}>Newest first</SelectItem>
                  <SelectItem value={1}>Oldest first</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={searchQuery.status}
                onValueChange={(value) => {
                  setSearchQuery((prev) => ({
                    ...prev,
                    status: value,
                    page: 1,
                  }));
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>ALL</SelectItem>
                  <SelectItem value={"PAID"} className="text-green-500">
                    PAID
                  </SelectItem>
                  <SelectItem value={"PENDING"} className="text-amber-500">
                    PENDING
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {transaction.isLoading ? (
              <Loading />
            ) : transaction.data.transactions.length > 0 ? (
              transaction.data.transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!transaction.isLoading && transaction.isSuccess && (
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              {transaction.data.transactions.length +
                (searchQuery.page - 1) * searchQuery.limit}{" "}
              of {transaction.data.pagination.total} transactions
            </div>
          )}
          <div className="flex items-center gap-2">
            <Select
              value={searchQuery.limit}
              onValueChange={(value) => {
                setSearchQuery((prev) => ({
                  ...prev,
                  limit: value,
                  page: 1,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={5}>5</SelectItem>
                <SelectItem value={10}>10</SelectItem>
                <SelectItem value={20}>20</SelectItem>
                <SelectItem value={50}>50</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchQuery.page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(searchQuery.page + 1)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
