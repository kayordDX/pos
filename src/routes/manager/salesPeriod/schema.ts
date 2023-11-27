import { z } from "zod";

export const outletSchema = z.object({
	outletId: z.number().min(1, { message: "Please select outlet" }),
});

export type Outlet = z.infer<typeof outletSchema>;
export type OutletSchema = typeof outletSchema;
