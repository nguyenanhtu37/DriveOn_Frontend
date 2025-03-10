import WidgetStatus from "@/components/WidgetStatus";

const GarageDashboard = () => {
  return (
    <div className=" p-7 h-ful bg-white">
      <div className=" flex justify-between flex-wrap gap-2 items-center">
        <WidgetStatus title={"Views"} content={"753K"} helper={"+11.011%"} />
        <WidgetStatus title={"Views"} content={"753K"} helper={"+11.011%"} />
        <WidgetStatus title={"Views"} content={"753K"} helper={"+11.011%"} />
        <WidgetStatus title={"Views"} content={"753K"} helper={"+11.011%"} />
      </div>
    </div>
  );
};

export default GarageDashboard;
