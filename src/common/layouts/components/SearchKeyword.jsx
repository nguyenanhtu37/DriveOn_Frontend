import { useSearchStore } from "@/app/stores/view/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchKeyword = ({ ...props }) => {
  const { setIsFetched } = useSearchStore();

  const navigate = useNavigate();

  const handleClick = () => {
    setIsFetched(true);
    navigate("/search");
  };

  return (
    <div
      className="w-full bg-white p-2 rounded-full outline outline-1 -outline-offset-1 outline-[#f4f4f4] shadow-md
          flex justify-end items-center "
    >
      <Input
        type="text"
        placeholder="Search for services, garages, address,..."
        className="w-full h-10 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
        {...props}
      />
      <Button
        size="icon"
        className="rounded-full bg-rose-500 hover:bg-rose-600 cursor-pointer"
        onClick={handleClick}
      >
        <SearchIcon className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};

export default SearchKeyword;
