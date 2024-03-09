<script lang="ts">
	import { Badge, Button, Card, Form, Input, Loader } from "@kayord/ui";
	import { CreditCardIcon, NfcIcon } from "lucide-svelte";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { page } from "$app/stores";
	import PaymentDone from "./PaymentDone.svelte";
	import { env } from "$env/dynamic/public";
	import { onMount } from "svelte";
	import { createPayManualPayment } from "$lib/api";
	import { goto } from "$app/navigation";

	let a: HTMLAnchorElement;

	let url: string | undefined;
	let reference: string | undefined;

	let linkLoading = false;

	let sse: EventSource;

	// const pay = (amount: Number) => {
	// 	linkLoading = true;
	// 	sse = new EventSource(
	// 		`${env.PUBLIC_API_URL}/pay/haloPay/${data.bookingId}/${amount}/${data.userId}`
	// 	);

	// 	sse.addEventListener("pay", (e) => {
	// 		console.log(e.data);
	// 		const response = JSON.parse(e.data);
	// 		if (response.type == "link") {
	// 			console.log("it is fucking here", response);
	// 			url = response.url;
	// 			reference = response.reference;
	// 			linkLoading = false;
	// 			if (a) {
	// 				a.href = url ?? "";
	// 				// a.click();
	// 			}
	// 		}
	// 		if (response.type == "status") {
	// 			console.log("status", response);
	// 		}
	// 	});

	// 	sse.onmessage = (e) => {
	// 		console.log("something happend");
	// 		const response = JSON.parse(e.data);
	// 		if (!response.length) return;

	// 		console.log(response);
	// 	};

	// 	sse.onerror = (err) => {
	// 		console.error("EventSource failed:", err);
	// 		sse.close();
	// 	};

	// 	return () => {
	// 		console.log("unmount");
	// 		if (sse.readyState === 1) {
	// 			sse.close();
	// 		}
	// 	};
	// };

	// onMount(() => {
	// 	return () => {
	// 		console.log("unm");
	// 		if (sse.readyState === 1) {
	// 			sse.close();
	// 		}
	// 	};
	// });

	let isPaymentDone = false;
	// $: payStatus = createPayStatus(reference ?? "", {
	// 	query: { refetchInterval: 5000, enabled: reference != undefined && !isPaymentDone },
	// });

	// $: isPaymentDone =
	// 	$payStatus?.data?.value?.responseCode == 0 &&
	// 	$payStatus?.data?.value?.authorisationCode.length > 0 &&
	// 	$payStatus?.data?.value?.transactionId.length > 0;

	const schema = z.object({
		amount: z.coerce.number().min(1, { message: "You need an amount of bigger than 1" }),
		isManual: z.boolean(),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmitHalo = async (data: FormSchema) => {
		// pay(data.amount);
	};

	const mutation = createPayManualPayment();
	const onSubmitManual = async (manualData: FormSchema) => {
		await $mutation.mutateAsync({
			data: { amount: manualData.amount, tableBookingId: Number($page.params.bookingId) },
		});
		goto(`/table/bill/${$page.params.bookingId}`);
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				if (form.data.isManual) {
					onSubmitManual(form.data);
				} else {
					onSubmitHalo(form.data);
				}
			}
		},
	});

	const { form: formData, enhance } = form;

	const haloPay = async () => {
		$formData.isManual = false;
		form.submit();
	};

	const manualPay = async () => {
		$formData.isManual = true;
		form.submit();
	};

	const total = Number($page.url.searchParams.get("total") ?? "0").toFixed(2);
	const balance = Number($page.url.searchParams.get("balance") ?? "0").toFixed(2);
</script>

<a class="hidden" href="/" bind:this={a}>Halo</a>

{#if isPaymentDone}
	<PaymentDone />
{:else}
	<form method="POST" use:enhance>
		<Card.Root class="m-4 mb-12">
			<Card.Header>
				<div class="flex items-center gap-2 justify-end">
					<Card.Description>Total: <Badge>R {total}</Badge></Card.Description>
					<Card.Description>Balance: <Badge>R {balance}</Badge></Card.Description>
				</div>
				<Form.Field {form} name="amount">
					<Form.Control let:attrs>
						<Form.Label>Amount</Form.Label>
						<Input {...attrs} type="number" bind:value={$formData.amount} />
					</Form.Control>
					<Form.Description>Enter amount to pay</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Header>
			<Card.Content>
				<div class="columns-2">
					<button class="w-full" on:click={haloPay} type="button">
						<Card.Root
							class="flex flex-col items-center gap-2 p-4 bg-primary border-2 hover:border-secondary-foreground"
						>
							{#if linkLoading}
								<Loader />
							{:else}
								<NfcIcon class="w-10 h-10 text-primary-foreground" />
								<div class="text-primary-foreground">Pay with Phone</div>
							{/if}
						</Card.Root>
					</button>
					<button class="w-full" on:click={manualPay} type="button">
						<Card.Root
							class="flex flex-col items-center gap-2 p-4 bg-secondary border-2 hover:border-secondary-foreground"
						>
							<CreditCardIcon class="w-10 h-10 text-muted-foreground" />
							<div class="text-muted-foreground">Manual Payment</div>
						</Card.Root>
					</button>
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-2">
				<Button class="w-full" href={`/table/bill/${$page.params.bookingId}`} variant="outline"
					>Cancel</Button
				>
			</Card.Footer>
		</Card.Root>
	</form>
{/if}
