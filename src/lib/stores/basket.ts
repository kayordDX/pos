import { liveQuery } from "dexie";
import { db } from "$lib/dexie";
import { v4 as uuid } from "uuid";

const clear = async () => {
	await db.basket.clear();
};

const remove = async (id: string) => {
	await db.basket.delete(id);
};

const add = async (bookingId: number, name: string, price: number) => {
	await db.basket.add({
		id: uuid(),
		bookingId,
		name,
		price,
	});
};

const basket = liveQuery(() => db.basket.toArray());
export { basket, clear, add, remove };
