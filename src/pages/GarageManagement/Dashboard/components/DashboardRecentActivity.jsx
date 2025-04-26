import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardRecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=32&width=32&text=NVA",
        initials: "NVA",
      },
      action: "đã đặt hàng",
      target: "Sản phẩm XYZ",
      time: "5 phút trước",
      status: "success",
    },
    {
      id: 2,
      user: {
        name: "Trần Thị B",
        avatar: "/placeholder.svg?height=32&width=32&text=TTB",
        initials: "TTB",
      },
      action: "đã hủy đơn hàng",
      target: "#12345",
      time: "30 phút trước",
      status: "error",
    },
    {
      id: 3,
      user: {
        name: "Lê Văn C",
        avatar: "/placeholder.svg?height=32&width=32&text=LVC",
        initials: "LVC",
      },
      action: "đã thanh toán",
      target: "1.500.000đ",
      time: "1 giờ trước",
      status: "success",
    },
    {
      id: 4,
      user: {
        name: "Phạm Thị D",
        avatar: "/placeholder.svg?height=32&width=32&text=PTD",
        initials: "PTD",
      },
      action: "đã đăng ký tài khoản",
      target: "",
      time: "3 giờ trước",
      status: "info",
    },
    {
      id: 5,
      user: {
        name: "Hoàng Văn E",
        avatar: "/placeholder.svg?height=32&width=32&text=HVE",
        initials: "HVE",
      },
      action: "đã gửi yêu cầu hỗ trợ",
      target: "#5678",
      time: "5 giờ trước",
      status: "warning",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>5 hoạt động mới nhất trong hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={activity.user.avatar || "/placeholder.svg"}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.action}{" "}
                  {activity.target && (
                    <span className="font-medium">{activity.target}</span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                  <Badge
                    variant={
                      activity.status === "success"
                        ? "default"
                        : activity.status === "error"
                        ? "destructive"
                        : activity.status === "warning"
                        ? "outline"
                        : "secondary"
                    }
                    className="text-[10px] px-1 py-0"
                  >
                    {activity.status === "success"
                      ? "Thành công"
                      : activity.status === "error"
                      ? "Lỗi"
                      : activity.status === "warning"
                      ? "Cảnh báo"
                      : "Thông tin"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
