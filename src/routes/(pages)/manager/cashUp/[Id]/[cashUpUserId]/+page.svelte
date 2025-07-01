<script lang="ts">
	import { page } from "$app/state";
	import { createCashUpUserClose, createCashUpUserDetail } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import { Avatar, Button, Card, Loader, Separator, toast } from "@kayord/ui";
	import { getInitials } from "$lib/util";
	import CashUpItem from "./CashUpItem.svelte";
	import AddItem from "./AddItem.svelte";
	import { BookUpIcon } from "@lucide/svelte";
	import { goto } from "$app/navigation";
	import CashUpItemManual from "./CashUpItemManual.svelte";

	const query = createCashUpUserDetail(page.params.Id ?? "", status.value.outletId, {
		cashUpUserId: Number(page.params.cashUpUserId ?? 0),
	});

	const mutation = createCashUpUserClose();

	const cashUpClose = async () => {
		try {
			const response = await $mutation.mutateAsync({
				data: { outletId: status.value.outletId, userId: page.params.Id ?? "" },
			});
			if (response.isError) {
				toast.error(response.message);
			} else {
				await goto("/manager/cashUp");
			}
		} catch (error) {
			toast.error(getError(error).message);
		}
	};

	const manualItems = $derived(
		$query?.data?.cashUpUserItems.filter((x) => x.cashUpUserItemType?.isAuto == false) ?? []
	);

	const autoItems = $derived(
		$query?.data?.cashUpUserItems.filter((x) => x.cashUpUserItemType?.isAuto == true) ?? []
	);
</script>

<div class="m-2">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.data}
		<Card.Root class="overflow-hidden w-full pt-0">
			<Card.Header class="flex flex-col items-start bg-muted/50 p-4">
				<div class="flex items-center gap-2 justify-between w-full">
					<div class="flex items-center gap-2">
						<Avatar.Root>
							<Avatar.Image src={$query.data.user?.image} alt="profile" />
							<Avatar.Fallback class="bg-primary text-primary-foreground">
								{getInitials($query.data.user?.name ?? "")}
							</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<Card.Title>{$query.data.user.name}</Card.Title>
							<Card.Description>{$query.data.user.email}</Card.Description>
						</div>
					</div>
					{#if Number(page.params.cashUpUserId ?? 0) == 0}
						<AddItem refetch={$query.refetch} cashUpUserId={$query.data.cashUpUserId} />
					{/if}
				</div>
			</Card.Header>
			<Card.Content>
				<div class="font-semibold text-left mt-5">Cash Up Items</div>
				<div class="flex flex-col gap-2 items-center mt-2">
					{#each autoItems as item}
						<CashUpItem {item} />
					{/each}
				</div>
				<Separator class="m-4" />
				<div class="grid gap-3">
					<div class="font-semibold">Balances</div>
					<ul class="grid gap-3">
						<li class="flex items-center justify-between">
							<span class="text-muted-foreground">Opening Balance</span>
							<span>R {$query.data.openingBalance.toFixed(2)}</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="text-muted-foreground">Gross Balance</span>
							<span>R {$query.data.grossBalance.toFixed(2)}</span>
						</li>
						<div class="flex flex-col gap-2 items-center">
							{#each manualItems as item}
								<CashUpItemManual {item} refetch={$query.refetch} />
							{/each}
						</div>
						<li class="flex items-center justify-between">
							<span class="text-muted-foreground">Net Balance</span>
							<span>R {$query.data.netBalance.toFixed(2)}</span>
						</li>
					</ul>
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-2">
				{#if Number(page.params.cashUpUserId ?? 0) == 0}
					<Button class="w-full" onclick={cashUpClose}>
						<BookUpIcon class="size-4 mr-2" /> Cash Up
					</Button>
				{/if}
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
