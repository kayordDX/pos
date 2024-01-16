import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type DeepLink = {
    url: string;
    reference: string;
}

export const GET: RequestHandler = async ({fetch, params}) => {
    const headersList = {
		"Content-Type": "application/json",
        "x-api-key": "KzI3ODMyMTQyNjExLjBjMGQyZTYyLTNkMTktNGFiMi05YmRiLTY0ZDZhMTBiYzdlNg=="
	};
	const body = {
        "merchantId": "88b44fe0-edb4-4f61-a930-0bc1eee688a4",
        "paymentReference": "asdlfkkkk",
        "amount": Number(params.amount),
        "timestamp": "Tue Jan 16 2024 20:31:40 GMT+0200",
        "currencyCode": "ZAR",
        "isConsumerApp": false,
        "image": {
          "required": false
        }
      };
	const bodyContent = JSON.stringify(body);
	const result = await fetch(`https://kernelserver.prod.haloplus.io/1.0.12/consumer/qrCode`, {
		method: "POST",
		body: bodyContent,
		headers: headersList,
	});

    if (result.status == 200 || result.status == 201) {
		const data = (await result.json()) as DeepLink;
        return json({ data });
    }else {
		error(500, { message: "Error deep link - " + result.status, });
    }
};