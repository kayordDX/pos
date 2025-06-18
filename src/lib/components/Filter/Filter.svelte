<script lang="ts" generics="TData, TValue">
	import { Check, ComponentIcon } from "@lucide/svelte";

	import type { Component } from "svelte";
	import { Command, Popover, Button, Separator, Badge } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import { goto } from "$app/navigation";

	type Props<TData, TValue> = {
		title: string;
		selected: string[];
		options: {
			label: string;
			value: string;
			icon?: Component;
		}[];
		showValue?: boolean;
	};

	let {
		selected = $bindable(),
		title,
		options,
		showValue = false,
	}: Props<TData, TValue> = $props();

	$effect(() => {
		goto(selected.join(","), { keepFocus: true });
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props }: any)}
			<Button {...props} variant="outline" size="sm" class="h-6">
				<ComponentIcon class="h-4 w-4" />

				{#if selected.length > 0}
					<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
						{selected.length}
					</Badge>
					<div class="hidden space-x-1 lg:flex">
						{#each options.filter((opt) => selected.includes(opt.value)) as option}
							<Badge variant="secondary" class="rounded-sm px-1 py-1 font-normal">
								{option.label}
							</Badge>
						{/each}
					</div>
				{/if}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						{@const isSelected = selected.includes(option.value)}
						<Command.Item
							onSelect={() => {
								if (isSelected) {
									selected = selected.filter((item) => item !== option.value);
								} else {
									selected.push(option.value);
								}
								const filterValues = Array.from(selected);
								selected = filterValues.length ? filterValues : [];
							}}
						>
							<div
								class={cn(
									"border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
									isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check class={cn("h-4 w-4 stroke-primary-foreground")} />
							</div>
							{#if option.icon}
								{@const Icon = option.icon}
								<Icon class="text-muted-foreground mr-2 h-4 w-4" />
							{/if}

							<span>{option.label}</span>
							{#if showValue}
								<span class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
									{option.value}
								</span>
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
