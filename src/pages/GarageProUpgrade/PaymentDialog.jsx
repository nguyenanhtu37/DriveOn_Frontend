import { useState } from "react";
import { Check, Wallet, DollarSign, CreditCard, Map } from "lucide-react";
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

const plans = [
  {
    id: "basic",
    name: "1 month",
    price: "5000",
    features: [
      "Truy cập toàn bộ nội dung",
      "Hỗ trợ 24/7",
      "Sử dụng trên 5 thiết bị",
      "Tải xuống không giới hạn",
    ],
    savings: null,
  },
  {
    id: "standard",
    name: "3 months",
    price: "199000",
    features: [
      "Truy cập toàn bộ nội dung",
      "Hỗ trợ 24/7",
      "Sử dụng trên 5 thiết bị",
      "Tải xuống không giới hạn",
    ],
    savings: "Tiết kiệm 33% so với gói 1 tháng",
  },
  {
    id: "premium",
    name: "6 months",
    price: "299000",
    features: [
      "Truy cập toàn bộ nội dung",
      "Hỗ trợ 24/7",
      "Sử dụng trên 5 thiết bị",
      "Tải xuống không giới hạn",
    ],
    savings: "Tiết kiệm gần 50% so với gói 1 tháng",
  },
];

export const PaymentDialog = ({ open, setOpen }) => {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const garages = useGetMyGarage();

  const garage =
    garages.isSuccess && garages.data.filter((garage) => garage.tag !== "pro");
  const [garageId, setGarageId] = useState(garages.data[0]?._id);

  const createPayment = useCreatePaymentLink();

  const handleCreatePayment = () => {
    createPayment.mutate(
      {
        garageId: garageId,
        amount: Number(plans.find((plan) => plan.id === selectedPlan).price),
        description: "Upgrade service package",
        // spell-checker: enable
      },
      {
        onSuccess: (data) => {
          console.log("Payment link created:", data.paymentLink.checkoutUrl);
          window.open(data.paymentLink.checkoutUrl, "_blank");
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
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary ring-2 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="p-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-xl font-bold">
                      {formatCurrency(plan.price)}/tháng
                    </p>
                  </div>
                  <div className="p-4 pt-0">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
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
                  value="wallet"
                  id="wallet"
                  className="peer sr-only"
                  disabled={true}
                />
                <Label
                  htmlFor="wallet"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Wallet className="mb-3 h-6 w-6" />
                  E-wallet
                </Label>
              </div>
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
              <div>
                <RadioGroupItem
                  value="cash"
                  id="cash"
                  className="peer sr-only"
                  disabled={true}
                />
                <Label
                  htmlFor="cash"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <DollarSign className="mb-3 h-6 w-6" />
                  Cash
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
                        garageId === garage._id
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setGarageId(garage._id)}
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
            <div className="flex items-center justify-center h-screen">
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
              disabled={garages.data.length === 0}
              onClick={handleCreatePayment}
            >
              Pay{" "}
              {formatCurrency(
                plans.find((plan) => plan.id === selectedPlan).price
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
