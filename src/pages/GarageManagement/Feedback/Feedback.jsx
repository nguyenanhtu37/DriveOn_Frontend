import {
  // useDeleteFeedback,
  useGetFeedbackForGarage,
} from "@/app/stores/entity/feedbackV2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  StarHalf,
  Calendar,
  MessageSquare,
  Filter,
  ChevronDown,
  ChevronUp,
  // X,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Feedback = () => {
  const { garageId } = useParams();
  const feedbacks = useGetFeedbackForGarage(garageId);
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!feedbacks.data.length) return 0;
    const sum = feedbacks.data.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );
    return (sum / feedbacks.data.length).toFixed(1);
  }, [feedbacks.data]);

  // Rating distribution
  const ratingDistribution = useMemo(() => {
    const distribution = [0, 0, 0, 0, 0];
    feedbacks.data.forEach((feedback) => {
      distribution[feedback.rating - 1]++;
    });
    return distribution;
  }, [feedbacks.data]);

  // Filter feedbacks by rating
  const filteredFeedbacks = useMemo(() => {
    if (filterRating === 0) return feedbacks.data;
    return feedbacks.data.filter(
      (feedback) => feedback.rating === filterRating
    );
  }, [feedbacks.data, filterRating]);

  const displayedFeedbacks = showAllFeedbacks
    ? filteredFeedbacks
    : filteredFeedbacks.slice(0, 3);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "2 tuần trước";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  };

  // const deleteFeedback = useDeleteFeedback();
  // const handleDeleteFeedback = (feedbackId) => {
  //   deleteFeedback.mutate(feedbackId, {
  //     onSuccess: () => {
  //       feedbacks.refetch();
  //     },
  //   });
  // };

  return (
    <div className="h-full bg-gradient-to-b from-white to-gray-50 rounded-lg">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Summary Section */}
        <div className="bg-white p-6 shadow-sm rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">
                Customer Reviews
              </h2>
              <div className="flex items-center mt-2">
                <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full">
                  <span className="text-xl font-bold text-yellow-600 mr-2">
                    {averageRating}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      const ratingValue = Number.parseFloat(averageRating);
                      return (
                        <span key={i}>
                          {value <= ratingValue ? (
                            <Star className="size-3 fill-yellow-500 text-yellow-500" />
                          ) : value - 0.5 <= ratingValue ? (
                            <StarHalf className="size-3 fill-yellow-500 text-yellow-500" />
                          ) : (
                            <Star className="size-3 text-gray-300" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <Badge variant="outline" className="ml-3">
                  {feedbacks.data.length} reviews
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filter reviews
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Rating distribution
                    </p>
                    <div className="space-y-1.5">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                          <div className="w-full max-w-[200px] bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  feedbacks.data.length
                                    ? (ratingDistribution[rating - 1] /
                                        feedbacks.data.length) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {ratingDistribution[rating - 1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Filter by star rating
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={filterRating === 0 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterRating(0)}
                      >
                        All
                      </Button>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={
                            filterRating === rating ? "default" : "outline"
                          }
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setFilterRating(rating)}
                        >
                          {rating}{" "}
                          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator />

        {/* Feedback List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {displayedFeedbacks.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-300" />
              <p className="mt-2 text-gray-500">
                There are no reviews matching the filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedFeedbacks.map((feedback) => (
                <motion.div
                  key={feedback._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-gray-100">
                            <AvatarImage
                              src={feedback.user.avatar || "/placeholder.svg"}
                              alt={feedback.user.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                              {feedback.user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-gray-800">
                                {feedback.user.name}
                              </h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="w-3.5 h-3.5 mr-1" />
                                {formatDate(feedback.createdAt)}
                              </div>
                            </div>

                            <div className="flex items-center mt-1 mb-3">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < feedback.rating
                                        ? "fill-yellow-500 text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed">
                              {feedback.text}
                            </p>

                            {/* <div className="flex items-center justify-end mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-red-500 hover:text-red-600"
                                onClick={() =>
                                  handleDeleteFeedback(feedback._id)
                                }
                              >
                                <X className="w-4 h-4 mr-1" />
                                <span className="text-xs">Delete</span>
                              </Button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredFeedbacks.length > 3 && !showAllFeedbacks && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="px-6"
                onClick={() => setShowAllFeedbacks(true)}
              >
                Show all {filteredFeedbacks.length} reviews
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {showAllFeedbacks && filteredFeedbacks.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="px-6"
                onClick={() => setShowAllFeedbacks(false)}
              >
                Collapse
                <ChevronUp className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
