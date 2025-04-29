import { useEffect, useState } from "react";
import AccordionService from "../components/AccordionService";
import { Accordion } from "@/components/ui/accordion";
import { useGetService } from "@/app/stores/entity/service";
import TopBar from "../components/Topbar";
import { Loading } from "@/components/Loading";

export const ViewServiceSystem = () => {
  const serviceData = useGetService();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(serviceData.data);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = serviceData.data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, serviceData.data]);

  if (serviceData.isLoading) return <Loading />;
  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      {/* Top bar */}
      <TopBar search={search} setSearch={handleSearch} />

      {/* Accordion */}
      <Accordion
        type="multiple"
        className=" w-full flex flex-col gap-2 items-start gap-y-3 mt-4 "
        collapsible
      >
        {filteredData.map((service) => (
          <AccordionService
            service={service}
            key={service._id}
            name={service.name}
            description={service.description}
            id={service._id}
            image={service.image}
            createAt={service.createdAt}
            updateAt={service.updatedAt}
          />
        ))}
      </Accordion>
    </div>
  );
};
