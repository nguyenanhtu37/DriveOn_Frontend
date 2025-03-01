import { useGetService } from "@/app/stores/entity/service";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Cog, Edit, Info, Trash2 } from "lucide-react";
import React from "react";

const AccordionService = ({
  id,
  service,
  description,
  image,
  createAt,
  updateAt,
  setSelectedService,
}) => {
  const handleSelected = () => {
    setSelectedService(id);
  };
  return (
    <Card className="w-full border border-gray-300 dark:border-gray-700 transition-shadow hover:shadow-lg">
      <AccordionItem value={`item-${id}`}>
        <AccordionTrigger className="flex items-center justify-between ">
          <CardHeader className="w-full flex flex-row items-center gap-3">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Cog className="w-5 h-5 mr-2 text-red-500" />
              {service}
            </CardTitle>
          </CardHeader>
        </AccordionTrigger>
        <AccordionContent className="transition-all duration-300 ease-in-out">
          <CardContent className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex items-start gap-4">
            <div className=" basis-2/3 w-full pl-6">
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
              <div className=" flex flex-col justify-start mt-4 items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">
                  Created at: {createAt}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Updated at: {updateAt}
                </span>
              </div>
            </div>
            <div className=" flex-1 rounded-md h-[200px] border border-gray-300 shadow-sm">
              {image && (
                <img
                  src={image}
                  alt={service}
                  className="w-full h-full rounded-md object-cover"
                />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="mt-6 flex space-x-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center">
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 transition-colors flex items-center">
                <Trash2 size={16} className="mr-2" />
                Remove
              </button>
            </div>
          </CardFooter>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
};

export default AccordionService;
