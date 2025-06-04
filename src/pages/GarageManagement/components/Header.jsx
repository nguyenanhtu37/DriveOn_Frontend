export function Header({ notificationComponent }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Garage Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Panel */}
          {notificationComponent}
        </div>
      </div>
    </header>
  );
}
