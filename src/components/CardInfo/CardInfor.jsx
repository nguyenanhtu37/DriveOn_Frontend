import { cn } from "@/lib/utils";

const CardInfo = ({ title, content, description, className }) => {
  return (
    <div
      className={cn(
        " p-6 max-w-[282px] w-full flex flex-col gap-y-8 rounded-md",
        className
      )}
    >
      <div className=" w-full text-sm font-semibold text-start">{title}</div>
      <div className=" flex justify-between items-center">
        <span className=" text-xl font-semibold text-center">{content}</span>
        <span className=" text-sm font-semibold text-center">
          {description}
        </span>
      </div>
    </div>
  );
};

export default CardInfo;
