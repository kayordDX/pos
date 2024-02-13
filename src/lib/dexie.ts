import Dexie, { type Table } from "dexie";

export interface Basket {
	id: string;
	bookingId: number;
	name: string;
	price: number;
}

export class BasketDatabase extends Dexie {
	basket!: Table<Basket>;

	constructor() {
		super("BasketDatabase");
		this.version(1).stores({
			basket: "++id, bookingId, name, price",
		});
	}
}

export const db = new BasketDatabase();
