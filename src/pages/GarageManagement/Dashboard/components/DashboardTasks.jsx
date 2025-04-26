import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function DashboardTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Kiểm tra báo cáo tháng",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Gọi điện cho khách hàng VIP",
      completed: false,
      priority: "high",
    },
    {
      id: 3,
      title: "Cập nhật danh sách sản phẩm",
      completed: true,
      priority: "medium",
    },
    {
      id: 4,
      title: "Họp team marketing",
      completed: false,
      priority: "medium",
    },
    {
      id: 5,
      title: "Kiểm tra email",
      completed: true,
      priority: "low",
    },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "Cao";
      case "medium":
        return "Trung bình";
      case "low":
        return "Thấp";
      default:
        return "Không xác định";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Công việc cần làm</CardTitle>
        <CardDescription>Quản lý danh sách công việc của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-2 rounded-md ${
                task.completed ? "bg-gray-50 dark:bg-gray-800/50" : ""
              }`}
            >
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-1 flex items-center justify-between">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm cursor-pointer ${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </label>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Thêm công việc mới
        </Button>
      </CardFooter>
    </Card>
  );
}
