import { useEffect, useMemo, useState } from "react";
import { Check, CreditCard, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetMyGarage } from "@/app/stores/entity/garage";
import { useCreatePaymentLink } from "@/app/stores/entity/payos";
import { formatCurrency } from "@/utils";
import { useGetSubscription } from "@/app/stores/entity/subscription";

export const PaymentDialog = ({ open, setOpen }) => {
  const [selectedPlan, setSelectedPlan] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const garages = useGetMyGarage(true);

  const subscriptionPlans = useGetSubscription();

  useEffect(() => {
    if (subscriptionPlans.isSuccess) {
      setSelectedPlan(subscriptionPlans.data[0]);
    }
  }, [subscriptionPlans.data, subscriptionPlans.isSuccess]);

  const [garageChoose, setGarageChoose] = useState(null);

  const garage = useMemo(() => {
    if (garages.isSuccess) {
      const filteredGarages = garages.data.filter(
        (garage) => garage.tag !== "pro"
      );
      if (!garageChoose && filteredGarages.length > 0) {
        setGarageChoose(filteredGarages[0]);
      }
      return filteredGarages;
    }
    return [];
  }, [garages.isSuccess, garages.data, garageChoose]);

  const createPayment = useCreatePaymentLink();

  const handleCreatePayment = () => {
    createPayment.mutate(
      {
        garageId: garageChoose._id,
        subscriptionId: selectedPlan._id,
        idempotencyKey: crypto.randomUUID(),
      },
      {
        onSuccess: (data) => {
          console.log("Payment link created:", data.paymentLink.checkoutUrl);
          window.location.href = data.paymentLink.checkoutUrl;
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Service package payment
          </DialogTitle>
          <DialogDescription>
            Choose the payment plan that suits you
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label>Select payment plan</Label>
            <div className="grid gap-4 md:grid-cols-3">
              {subscriptionPlans.data?.map((plan) => (
                <Card
                  key={plan._id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan?._id === plan._id
                      ? "border-primary ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="p-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-xl font-bold">
                      {formatCurrency(plan.price)}/{plan.month} month
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <ul className="space-y-2">
                      {plan.description.split(", ").map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Payment method</Label>
            <RadioGroup
              defaultValue="bank"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="bank"
                  id="bank"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="bank"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Payment transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {garage.length > 0 ? (
            <>
              <div className="space-y-2">
                <Label>Choose Garage</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  {garage.map((garage) => (
                    <Card
                      key={garage._id}
                      className={`cursor-pointer transition-all ${
                        garageChoose?._id === garage._id
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setGarageChoose(garage)}
                    >
                      <div className="p-4">
                        <h3 className="font-semibold">{garage.name}</h3>
                      </div>
                      <div className="p-4 pt-0">
                        <ul className="space-y-2">
                          <li className="flex items-start gap-x-2">
                            <Map className=" size-12 text-primary" />
                            <span>{garage.address}</span>
                          </li>
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />
            </>
          ) : (
            <div className="flex items-center justify-center ">
              <h1 className="text-2xl font-semibold text-gray-500">
                No garages found
              </h1>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-200"
              type="submit"
              disabled={!garage.length > 0}
              onClick={handleCreatePayment}
            >
              Pay {formatCurrency(selectedPlan.price)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
