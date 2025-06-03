import { useGetFeedbackForGarage } from "@/app/stores/entity/feedbackV2";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Settings } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FeedbackFilters } from "./components/FeedbackFilters";
import { FeedbackCard } from "./components/FeedbackCard";
import { useGetService } from "@/app/stores/entity/service-detail";

export const Feedback = () => {
  const { garageId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const payload = {
    garageId: garageId,
    keyword: searchTerm,
    rating: ratingFilter === "all" ? undefined : ratingFilter,
    service: serviceFilter === "all" ? undefined : serviceFilter,
    type: typeFilter === "all" ? undefined : typeFilter,
    page: 1,
  };

  const feedbacksData = useGetFeedbackForGarage(payload);

  const serviceInGarage = useGetService(garageId);

  // Extract unique services for filter
  const services = serviceInGarage.data;

  // Filter feedbacks
  const filteredFeedbacks = feedbacksData.data.feedbacks;

  const clearFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setServiceFilter("all");
    setTypeFilter("all");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage feedback
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage customer feedback
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Stats */}
        {/* <FeedbackStats feedbacks={feedbacksData.data.feedbacks} /> */}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              serviceFilter={serviceFilter}
              setServiceFilter={setServiceFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              services={services}
              onClearFilters={clearFilters}
            />
          </CardContent>
        </Card>

        {/* Feedback List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Danh sách phản hồi</h2>
          </div>

          {filteredFeedbacks?.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No responses were found matching the filter
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeedbacks?.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
