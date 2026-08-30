import { session } from "$lib/firebase.svelte";
import { info } from "$lib/stores/info.svelte";

export const downloadPdf = async (bookingId: number) => {
	const token = (await session.user?.getIdToken()) ?? "";
	const url = `/bill/download/${bookingId}`;
	let fullUrl = `${info.kayordURL()}${url}`;

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
