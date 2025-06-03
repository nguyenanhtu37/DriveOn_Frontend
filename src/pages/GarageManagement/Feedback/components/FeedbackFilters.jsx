import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function FeedbackFilters({
  searchTerm,
  setSearchTerm,
  ratingFilter,
  setRatingFilter,
  serviceFilter,
  setServiceFilter,
  typeFilter,
  setTypeFilter,
  services,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className=" relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by content, customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={ratingFilter} onValueChange={setRatingFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All reviews</SelectItem>
          <SelectItem value="5">5 stars</SelectItem>
          <SelectItem value="4">4 stars</SelectItem>
          <SelectItem value="3">3 stars</SelectItem>
          <SelectItem value="2">2 stars</SelectItem>
          <SelectItem value="1">1 star</SelectItem>
        </SelectContent>
      </Select>

      <Select value={serviceFilter} onValueChange={setServiceFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All services</SelectItem>
          {services &&
            services.map((service) => (
              <SelectItem key={service._id} value={service._id}>
                {service.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Response type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="specific">Specific service</SelectItem>
          <SelectItem value="general">General rating</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onClearFilters} size="icon">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
