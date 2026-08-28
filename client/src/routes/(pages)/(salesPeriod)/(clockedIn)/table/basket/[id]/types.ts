import { z } from "zod";

export const schema = z.object({
	orderItemIds: z.array(z.number()),
	orderItemStatusId: z.number(),
});
export type FormSchema = z.infer<typeof schema>;
