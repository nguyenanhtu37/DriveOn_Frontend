import { cn } from "@/lib/utils";
import { useFilterStore } from "@/app/stores/view/filter";

function ItemIcon({ image, title, id }) {
  const { serviceSystem, setServiceSystem } = useFilterStore();
  const isActive = serviceSystem.includes(id);

  const handleClick = () => setServiceSystem(id);

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center gap-y-2">
        <img
          className="size-10 rounded-full object-cover"
          src={image}
          alt={title}
        />
        <span
          className={cn(
            "text-sm text-[#717171] group-hover:text-[#222222] max-w-[80px] line-clamp-1",
            isActive && "text-[#222222]"
          )}
        >
          <span className="block w-max group-hover:animate-[marquee_3s_linear_infinite]">
            {title}
          </span>
        </span>
      </div>
      <hr
        className={cn(
          "w-full h-[2px] border-none rounded-full transition-all ease-in-out",
          isActive ? "bg-[#222222]" : "group-hover:bg-[#DDDDDD]"
        )}
      />
    </div>
  );
}

export default ItemIcon;
