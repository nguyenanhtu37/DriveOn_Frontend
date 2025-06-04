import { Bell } from "lucide-react";

export function EmptyNotificationState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 bg-gray-100 rounded-full mb-4">
        <Bell className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">No rescue requests</h3>
      <p className="text-sm text-gray-500 max-w-sm">
        When customers need emergency assistance, their requests will appear
        here.
      </p>
    </div>
  );
}
