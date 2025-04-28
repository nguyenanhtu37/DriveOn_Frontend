import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import clsx from "clsx";
import { Slash } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const BreadcrumbWrapper = () => {
  const param = useLocation();
  const [path, setPath] = React.useState([]);

  useEffect(() => {
    const pathName = param.pathname.split("/");
    const path = pathName.map((item, index) => {
      const href = pathName.slice(0, index + 1).join("/");
      return {
        name: item,
        key: index,
        href,
      };
    });
    setPath(path);
  }, [param]);

  console.log(path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item) => {
          return (
            <>
              <BreadcrumbItem key={item.key}>
                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
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
