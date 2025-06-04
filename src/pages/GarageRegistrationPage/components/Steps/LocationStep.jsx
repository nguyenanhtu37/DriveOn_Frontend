import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MapPin } from "lucide-react";

export function LocationStep({ form }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-5 h-5" />
        <span>Help customers find your garage easily</span>
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complete Address *</FormLabel>
            <FormControl>
              <Input
                placeholder="123 Main Street, City, State, ZIP Code"
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </FormControl>
            <FormMessage />
            <p className="text-sm text-muted-foreground">
              Please provide a complete address for accurate location mapping
            </p>
          </FormItem>
        )}
      />
    </div>
  );
}
