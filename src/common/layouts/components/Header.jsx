import { useSearchStore } from "@/app/stores/view/search";
import Navbar from "./Navbar";
import SearchKeyword from "./SearchKeyword";
import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { useSearchByKeyword } from "@/app/stores/entity/search";
import { useEffect, useRef, useState } from "react";
import { ResultItem } from "./ResultItem";
import { PopoverContent } from "@radix-ui/react-popover";
import { useClickOutside, useDebounce } from "react-haiku";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { keyword, setKeyword } = useSearchStore();

  const debouncedValue = useDebounce(keyword, 500);
  const handleChange = (event) => setKeyword(event.target.value);
  const searchRef = useRef();

  const handleClose = () => {
    setIsOpen(false);
  };

  const response = useSearchByKeyword(debouncedValue);

  useClickOutside(searchRef, handleClose);

  return (
    <div className="sticky top-0 z-50 bg-[#fafafa]  flex flex-col  w-full h-[160px]   border-b  border-[#eaeaea] ">
      <Navbar />

      <div className="w-full md:w-[50%] mx-auto" ref={searchRef}>
        <Popover open={isOpen}>
          <PopoverAnchor>
            <SearchKeyword
              value={keyword}
              onChange={handleChange}
              onClick={() => setIsOpen(true)}
            />
          </PopoverAnchor>
          <PopoverContent align="start" sideOffset={10}>
            <div
              className=" bg-white flex flex-col rounded-3xl border min-h-[100px]  shadow-md w-full max-h-[400px] overflow-y-auto"
              style={{ width: (searchRef.current?.offsetWidth / 100) * 95 }}
            >
              {!debouncedValue && (
                <div className="flex-1 flex flex-col justify-center items-center mt-4 h-full w-full">
                  <p className="text-sm text-muted-foreground">
                    Find something interesting? Start typing to search.
                  </p>
                </div>
              )}
              {response.isLoading && (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full size-10 border-t-4 border-b-4 border-red-500"></div>
                </div>
              )}
              {response.isSuccess && (
                <div className="flex w-full flex-col items-center ">
                  {response.data.result.length > 0 ? (
                    response.data.result.map((item, index) => (
                      <ResultItem
                        key={index}
                        item={item}
                        onClick={() => {
                          setKeyword(item.name);
                        }}
                      />
                    ))
                  ) : (
                    <div className="flex-1 flex flex-col justify-center items-center mt-6 h-full w-full">
                      <p className="text-sm text-muted-foreground">
                        No results found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
