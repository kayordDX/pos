<script lang="ts">
	import { Button, toast } from "@kayord/ui";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors } from "@kayord/ui/formsnap";
	import Quantity from "$lib/components/Quantity/Quantity.svelte";
	import { delay } from "$lib/util";

	const schema = z.object({
		quantity: z.coerce.number().min(1),
	});
	type FormSchema = z.infer<typeof schema>;

	let isSubmitting = $state(false);

	const form = superForm(defaults({ quantity: 1 }, zod4(schema)), {
		SPA: true,
		// validators: zod4(schema),
		// multipleSubmits: "prevent",
		// delayMs: 1500,
		// timeoutMs: 8000,
		onUpdated: async ({ form }) => {
			if (isSubmitting) {
				console.log("prevent");
				return;
			}
			isSubmitting = true;
			if (form.valid) {
				await delay(2000);
				toast("...");
				console.log(form);
			}
			isSubmitting = false;
		},
		// async onUpdate({ form }) {
		// 	console.log(isSubmitting, "KJ", $delayed, $submitting, $timeout);
		// 	if (form.valid) {
		// 		onSubmit(form.data);
		// 	}
		// },
	});

	const { form: formData, enhance, delayed, submitting, timeout } = form;
</script>

<form use:enhance method="POST">
	<Field {form} name="quantity">
		<Control>
			<Quantity bind:value={$formData.quantity} />
		</Control>
		<FieldErrors />
	</Field>
	<Button class="mt-2" type="submit">Add</Button>
	<div>
		Delayed: {$delayed}
	</div>
	<div>
		submitting: {$submitting}
	</div>
	<div>
		timeout: {$timeout}
	</div>
</form>
