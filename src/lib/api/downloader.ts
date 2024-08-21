import { session } from "$lib/firebase";
import { get } from "svelte/store";
import { PUBLIC_API_URL } from "$env/static/public";

export const downloadPdf = async (bookingId: number) => {
	const token = (await get(session)?.getIdToken()) ?? "";
	const url = `/bill/download/${bookingId}`;
	let fullUrl = `${PUBLIC_API_URL}${url}`;

	const response = await fetch(fullUrl, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/pdf",
		},
	});
	return response;
};

export const downloadFile = async (response: Response, fileName: string) => {
	const blob = await response.blob();
	const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
	const link = document.createElement("a");
	link.href = downloadUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	link.parentNode?.removeChild(link);
};
