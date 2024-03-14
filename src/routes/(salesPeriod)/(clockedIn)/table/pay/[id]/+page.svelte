<script lang="ts">
	import { Badge, Button, Card, Form, Input, Loader, toast } from "@kayord/ui";
	import { CreditCardIcon, NfcIcon } from "lucide-svelte";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { page } from "$app/stores";
	import PaymentDone from "./PaymentDone.svelte";
	import { onMount } from "svelte";
	import {
		client,
		createPayManualPayment,
		type CommonWrapperResultOfStatusResultDto,
	} from "$lib/api";
	import { goto } from "$app/navigation";
	import { hub } from "$lib/stores/hub";

	let a: HTMLAnchorElement;

	let url: string | undefined;
	let reference: string | undefined;

	let linkLoading = false;

	const payStatusAction = (payStatus: CommonWrapperResultOfStatusResultDto) => {
		console.log("PayMessage", payStatus);
		if (payStatus.value?.paymentReference === reference) {
			if (
				(payStatus.value?.transactionId.length ?? 0) > 0 &&
				payStatus.value?.responseCode == 0 &&
				(payStatus.value?.authorisationCode.length ?? 0) > 0
			) {
				isPaymentDone = true;
			}
		}
	};

	onMount(() => {
		if (!$hub) {
			return;
		}
		$hub.on("PayMessage", payStatusAction);
		return () => {
			$hub?.off("PayMessage", payStatusAction);
		};
	});

	let isPaymentDone = false;

	const schema = z.object({
		amount: z.coerce.number().min(1, { message: "You need an amount of bigger than 1" }),
		isManual: z.boolean(),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmitHalo = async (data: FormSchema) => {
		const linkResult = await client.GET("/pay/getLink", {
			params: { query: { amount: data.amount, tableBookingId: Number($page.params.id) } },
		});
		if (linkResult.data?.value) {
			url = linkResult.data.value.url;
			reference = linkResult.data.value.reference;
			if (a) {
				a.href = url ?? "";
				a.click();
			}
		} else {
			toast.error("Could not start payment");
		}
	};

	const mutation = createPayManualPayment();
	const onSubmitManual = async (manualData: FormSchema) => {
		await $mutation.mutateAsync({
			data: { amount: manualData.amount, tableBookingId: Number($page.params.id) },
		});
		goto(`/table/bill/${$page.params.id}`);
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
				<div class="columns-2 flex gap-4">
					<button class="w-full" on:click={haloPay} type="button">
						<Card.Root
							class="flex flex-col items-center gap-2 p-4 bg-primary border-2 hover:border-secondary-foreground h-full justify-center"
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
							class="flex flex-col items-center gap-2 p-4 bg-secondary border-2 hover:border-secondary-foreground h-full justify-center"
						>
							<CreditCardIcon class="w-10 h-10 text-muted-foreground" />
							<div class="text-muted-foreground">Manual Payment</div>
						</Card.Root>
					</button>
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-2">
				<Button class="w-full" href={`/table/bill/${$page.params.id}`} variant="outline"
					>Cancel</Button
				>
			</Card.Footer>
		</Card.Root>
	</form>
{/if}
