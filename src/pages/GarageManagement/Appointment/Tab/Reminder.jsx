import MaintenanceReminderSystem from "../../components/MaintenanceReminderSystem";

const Reminder = () => {
  return (
    <div className=" p-4 flex flex-col gap-y-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Maintenance Reminders
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure and manage customer maintenance reminders
        </p>
      </div>

      <MaintenanceReminderSystem />
    </div>
  );
};

export default Reminder;
