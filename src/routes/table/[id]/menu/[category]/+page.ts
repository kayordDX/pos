import type { PageLoad } from "./$types";

const menu = [
	{
		id: 2,
		name: "Drinks",
		subItems: [
			{
				id: 8,
				name: "Alcoholic",
				menuItems: [
					{
						id: 12,
						name: "Red Wine",
					},
					{
						id: 12,
						name: "White Wine",
					},
				],
			},
			{
				id: 9,
				name: "Non Alcoholic",
			},
		],
	},
];

export const load = (async ({ params }) => {
	return { bookingId: params.id, category: params.category, menu: menu };
}) satisfies PageLoad;
