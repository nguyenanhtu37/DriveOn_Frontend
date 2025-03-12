import { SlidersHorizontal } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useGetService } from "@/app/stores/entity/service";
import { Form } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

const DialogFilter = () => {
  const service = useGetService();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 px-5 py-3 rounded-md border border-[#dddddd] bg-white hover:bg-[#1c1c1c]/10 hover:border-[#1c1c1c] transition-colors ease-in-out cursor-pointer duration-150  group">
          <SlidersHorizontal
            size={18}
            className="text-gray-800 group-hover:text-black transition-all"
          />
          <span className="text-sm font-medium text-gray-800 group-hover:text-black">
            Filter
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[590px] h-[818px] max-w-none flex flex-col items-center ">
        <DialogTitle className="text-center">Filter</DialogTitle>
        <Form>
          <form className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="px-6 py-7 w-full flex-col gap-y-6 border-y border-[#1c1c1c]"
              >
                <AccordionTrigger className="w-full">
                  <div className=" flex justify-between items-center">
                    <div className=" flex flex-col items-start gap-y-2">
                      <Label>Service</Label>
                      <DialogDescription>
                        Choose the service you want
                      </DialogDescription>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" mt-4">
                  <div className=" grid grid-cols-2">
                    {service.data.map((service) => (
                      <div
                        key={service._id}
                        className=" flex gap-x-4 items-center mb-3"
                      >
                        <Checkbox id={service._id} />
                        <div className="grid gap-1.5 leading-none ">
                          <label
                            htmlFor={service._id}
                            className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {service.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilter;
