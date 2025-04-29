import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowDownLeft,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Receipt,
  ShoppingBag,
  Utensils,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Transaction category icons
const categoryIcons = {
  income: ArrowDownLeft,
  subscription: CreditCard,
  shopping: ShoppingBag,
  utilities: Zap,
  dining: Utensils,
};

export const TransactionItem = ({ transaction }) => {
  const [expanded, setExpanded] = useState(false);

  // Determine icon based on category
  const Icon = categoryIcons[transaction.category] || Receipt;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors",
          expanded && "border-b"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              transaction.status === "PAID" ? "bg-green-100" : "bg-amber-100"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                transaction.status === "PAID"
                  ? "text-green-600"
                  : "text-amber-500"
              )}
            />
          </div>
          <div>
            <div className="font-medium">{transaction.description}</div>
            <div className="text-sm text-muted-foreground">
              {transaction.garageId?.name || "N/A"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div
              className={cn(
                "font-medium",
                transaction.status === "PAID"
                  ? "text-green-600"
                  : "text-amber-600"
              )}
            >
              {transaction.status === "PAID" ? "+" : "..."}
              {(transaction.amount / 1000).toFixed(3)}k
            </div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(transaction.createdAt), "MMM d, yyyy")}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Date & Time
              </div>
              <div>{format(new Date(transaction.createdAt), "PPP")}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </div>
              <div className="capitalize flex items-center">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    transaction.status.toLowerCase() === "paid"
                      ? "bg-green-500"
                      : "bg-amber-500"
                  )}
                ></span>
                {transaction.status.toLowerCase()}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Subscription
              </div>
              <div>{transaction.subscriptionId?.name || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Reference
              </div>
              <div className="font-mono text-sm">
                {transaction.idempotencyKey}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Paid At
              </div>
              <div>
                {transaction.paidAt
                  ? format(new Date(transaction.paidAt), "PPPpp")
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
