import { persisted } from "svelte-persisted-store";

export const backOffice = persisted<number>("backOffice", 500);
