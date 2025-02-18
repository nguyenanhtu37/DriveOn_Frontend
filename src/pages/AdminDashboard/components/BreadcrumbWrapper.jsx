import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const BreadcrumbWrapper = () => {
  const param = useLocation();
  const [path, setPath] = React.useState([]);

  useEffect(() => {
    const pathName = param.pathname.split("/");
    const path = pathName.map((item, index) => {
      return {
        name: item,
        key: index,
      };
    });
    setPath(path);
  }, [param]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item) => {
          return (
            <>
              <BreadcrumbItem key={item.key}>
                <BreadcrumbLink href="#">{item.name}</BreadcrumbLink>
              </BreadcrumbItem>
              {item.key !== path.length - 1 && (
                <BreadcrumbSeparator className={"opacity-40"}>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
