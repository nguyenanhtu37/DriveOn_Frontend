
import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleId: z.string().nonempty('Vehicle ID is required'),
  make: z.string().nonempty('Make is required'),
  model: z.string().nonempty('Model is required'),
  year: z.number().min(1900, 'Year must be greater than or equal to 1900').max(new Date().getFullYear(), 'Year cannot be in the future').nonnegative(),
  color: z.string().nonempty('Color is required'),
  vin: z.string().length(17, 'VIN must be exactly 17 characters').nonempty('VIN is required'),
});
