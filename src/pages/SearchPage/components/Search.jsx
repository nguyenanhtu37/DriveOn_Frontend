import { cn } from "@/lib/utils";

import { useCallback, useEffect, useRef, useState } from "react";
import SearchLocation from "./SearchLocation";
import { useClickOutside } from "react-haiku";
import { SearchService } from "./SearchService";
import { SearchTime } from "./SearchTime";

const Search = () => {
  const [searchFocused, setSearchFocused] = useState("");

  const searchRef = useRef(null);
  const boxRef = useRef(null);

  const searchLocationRef = useRef(null);

  const searchServiceRef = useRef(null);

  const searchTimeRef = useRef(null);

  const [boxWidth, setBoxWidth] = useState(0);

  const [indicatorStyle, setIndicatorStyle] = useState({});
  const handleClickOutSide = () => {
    setSearchFocused("");
  };

  const calculateWidth = useCallback(() => {
    switch (searchFocused) {
      case "location": {
        setIndicatorStyle({
          left: `${searchLocationRef.current.offsetLeft}px`,
          width: `${searchLocationRef.current.offsetWidth}px`,
          transition: "all 0.2s ease",
        });
        break;
      }
      case "service": {
        setIndicatorStyle({
          left: `${searchServiceRef.current.offsetLeft}px`,
          width: `${searchServiceRef.current.offsetWidth}px`,
          transition: "all 0.2s ease",
        });
        break;
      }
      case "time": {
        setIndicatorStyle({
          left: `${searchTimeRef.current.offsetLeft}px`,
          width: `${searchTimeRef.current.offsetWidth}px`,
          transition: "all 0.2s ease",
        });
        break;
      }

      default:
        setIndicatorStyle({});
        break;
    }
  }, [searchFocused]);

  useEffect(() => {
    if (searchFocused) {
      calculateWidth();
    }
  }, [calculateWidth, searchFocused]);

  useEffect(() => {
    const updateBoxWidth = () => {
      if (boxRef.current) {
        setBoxWidth(boxRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateBoxWidth();

    // Add resize listener
    window.addEventListener("resize", updateBoxWidth);

    return () => window.removeEventListener("resize", updateBoxWidth);
  }, []);

  useClickOutside(searchRef, handleClickOutSide);

  return (
    <div
      ref={boxRef}
      className={cn(" transition-all w-[65%] lg:w-[55%]  mx-auto  ")}
    >
      <div
        ref={searchRef}
        className={cn(
          " relative flex items-center border rounded-full shadow-sm bg-white transition-all ease-in-out duration-100 overflow-hidden",
          searchFocused !== "" ? "bg-[#ebebeb]" : ""
        )}
      >
        <SearchLocation
          isFocused={searchFocused === "location"}
          setSearchFocused={setSearchFocused}
          boxWidth={boxWidth}
          ref={searchLocationRef}
        />
        {!searchFocused && <div className="h-8 w-px bg-[#e6e6e6]"></div>}

        <SearchService
          isFocused={searchFocused === "service"}
          setSearchFocused={setSearchFocused}
          boxWidth={boxWidth}
          ref={searchServiceRef}
        />
        {!searchFocused && <div className="h-8 w-px bg-[#e6e6e6]"></div>}
        <div className="hidden md:flex flex-1  items-center justify-between">
          <SearchTime
            isFocused={searchFocused === "time"}
            setSearchFocused={setSearchFocused}
            boxWidth={boxWidth}
            ref={searchTimeRef}
          />
        </div>

        <div
          className="absolute  h-full  rounded-full bg-white transition-transform ease-in-out duration-100 top-0 z-0"
          style={indicatorStyle}
        ></div>
      </div>
    </div>
  );
};

export { Search };
