import { useEffect, useState } from "react";
import AccordionService from "../components/AccordionService";
import { Accordion } from "@/components/ui/accordion";
import { useGetServiceByManage } from "@/app/stores/entity/service";
import TopBar from "../components/Topbar";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/pages/GarageManagement/components/Pagination";

export const ViewServiceSystem = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const payload = {
    page: page,
    limit: 8,
    keyword: keyword,
  };

  const serviceData = useGetServiceByManage(payload);

  const services = serviceData.data?.services || [];
  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } =
    serviceData.data.pagination ?? {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return (
    <div className=" px-7 pt-7 w-full flex flex-col gap-y-5 items-start">
      {/* Top bar */}
      <TopBar search={keyword} setSearch={setKeyword} />

      {/* Accordion */}
      {serviceData.isLoading ? (
        <Loading />
      ) : (
        <Accordion
          type="multiple"
          className=" w-full flex flex-col gap-2 items-start gap-y-3 mt-4 "
          collapsible
        >
          {services.map((service) => (
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
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
