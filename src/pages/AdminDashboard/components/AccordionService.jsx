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

import { Cog } from "lucide-react";
import { EditService } from "../ViewServiceSystem/components/EditService";
import { DeleteService } from "../ViewServiceSystem/components/DeleteService";
import { formatDate } from "@/lib/formatDate";

const AccordionService = ({
  id,
  name,
  description,
  image,
  createAt,
  updateAt,
  service,
}) => {
  return (
    <Card className="w-full border border-gray-300 dark:border-gray-700 transition-shadow hover:shadow-lg">
      <AccordionItem value={`item-${id}`}>
        <AccordionTrigger className="flex items-center justify-between ">
          <CardHeader className="w-full flex flex-row items-center gap-3">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Cog className="w-5 h-5 mr-2 text-red-500" />
              {name}
            </CardTitle>
          </CardHeader>
        </AccordionTrigger>
        <AccordionContent className="transition-all duration-300 ease-in-out">
          <CardContent className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex items-start gap-4">
            <div className=" basis-2/3 w-full pl-6">
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
              <div className=" flex flex-col justify-start mt-4 items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">
                  Created at: {formatDate(createAt)}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Updated at: {formatDate(updateAt)}
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
              <EditService service={service} />
              <DeleteService serviceId={service._id} />
            </div>
          </CardFooter>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
};

export default AccordionService;
