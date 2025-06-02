import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Calendar, TrendingUp } from "lucide-react";

export function FeedbackStats({ feedbacks }) {
  const totalFeedbacks = feedbacks.length;
  const averageRating =
    feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
    totalFeedbacks;
  const ratingDistribution = feedbacks.reduce((acc, feedback) => {
    acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
    return acc;
  }, {});

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthFeedbacks = feedbacks.filter((feedback) => {
    const feedbackDate = new Date(feedback.createdAt);
    return (
      feedbackDate.getMonth() === thisMonth &&
      feedbackDate.getFullYear() === thisYear
    );
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng phản hồi</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFeedbacks}</div>
          <p className="text-xs text-muted-foreground">
            +{thisMonthFeedbacks} trong tháng này
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Đánh giá trung bình
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">5 sao</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ratingDistribution[5] || 0}</div>
          <p className="text-xs text-muted-foreground">
            {(((ratingDistribution[5] || 0) / totalFeedbacks) * 100).toFixed(1)}
            % tổng số
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tháng này</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisMonthFeedbacks}</div>
          <p className="text-xs text-muted-foreground">Phản hồi mới</p>
        </CardContent>
      </Card>
    </div>
  );
}
