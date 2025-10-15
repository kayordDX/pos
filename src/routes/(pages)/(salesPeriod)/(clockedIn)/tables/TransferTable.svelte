<script lang="ts">
	import { Button, Combobox, Dialog, Form, Input, Label, toast } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { UserRoundPenIcon } from "@lucide/svelte";
	import z from "zod";
	import { getError } from "$lib/types";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod4 } from "sveltekit-superforms/adapters";
	import {
		createUserUsersType,
		type TableGetMyBookedResponse,
		createTableBookingTransfer,
	} from "$lib/api";

	interface Props {
		otherTable: TableGetMyBookedResponse;
		refetch: () => void;
	}

	let { otherTable, refetch }: Props = $props();

	const isManager = $derived(status.hasRole("manager"));

	const schema = z.object({
		transferUserId: z.string().min(1, { message: "Transfer User is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const createUserUsersTypeQuery = $derived(
		createUserUsersType({ isBackOffice: false, isFrontLine: true })
	);
	const users = $derived(createUserUsersTypeQuery.data ?? []);

	const transferMutation = createTableBookingTransfer();

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			await transferMutation.mutateAsync({
				data: {
					tableBookingId: otherTable.id,
					transferUserId: data.transferUserId,
				},
			});
			toast.info("Transferred table");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults({}, zod4(schema)), {
		SPA: true,
		id: `transfer-table-${otherTable.id}`,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;

	let open = $state(false);
</script>

{#if isManager}
	<div class="w-full flex items-center justify-end">
		<Button
			size="sm"
			variant="outline"
			onclick={(e) => {
				e.preventDefault();
				open = true;
			}}
		>
			<UserRoundPenIcon />Transfer
		</Button>
	</div>

	{#if open}
		<Dialog.Root bind:open>
			<Dialog.Content class="max-h-[98%] overflow-auto">
				<form method="POST" use:enhance>
					<Dialog.Header>
						<Dialog.Title>Transfer Table</Dialog.Title>
						<Dialog.Description>Transfer table to another User</Dialog.Description>
					</Dialog.Header>
					<div class="flex flex-col gap-4 p-4">
						<Label>Current User</Label>
						<Input disabled value={otherTable.user.name} />
						<Form.Field {form} name="transferUserId">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Transfer to User</Form.Label>
									<Combobox
										{...props}
										bind:value={$formData.transferUserId}
										name="User"
										items={users.map((i) => ({ value: i.userId, label: i.name }))}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-destructive text-sm" />
						</Form.Field>
					</div>
					<Dialog.Footer class="gap-2">
						<Button type="submit">Submit</Button>
						<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
{/if}
