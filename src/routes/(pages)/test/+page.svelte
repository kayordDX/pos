<script lang="ts">
	import { THEMES } from "$lib/themes";
	import { Button, Select, toast } from "@kayord/ui";
	import { setTheme, theme } from "@kayord/ui/mode-watcher";

	const label = $derived(THEMES.find((t) => t.value === theme.current)?.name ?? "Select a theme");

	const colors = [
		"accent-foreground",
		"accent",
		"background",
		"border",
		"card-foreground",
		"card",
		"destructive",
		"foreground",
		"input",
		"muted-foreground",
		"muted",
		"popover-foreground",
		"popover",
		"primary-foreground",
		"primary",
		"ring",
		"secondary-foreground",
		"secondary",
		"sidebar-accent-foreground",
		"sidebar-accent",
		"sidebar-background",
		"sidebar-border",
		"sidebar-foreground",
		"sidebar-primary-foreground",
		"sidebar-primary",
		"sidebar-ring",
		"sidebar",
	];
</script>

<div class="flex gap-8 flex-col p-6">
	<Select.Root type="single" bind:value={() => theme.current, (v) => setTheme(v ?? "default")}>
		<Select.Trigger size="sm" class="w-32">
			{label}
		</Select.Trigger>
		<Select.Content align="end">
			{#each THEMES as theme (theme.value)}
				<Select.Item value={theme.value} label={theme.name}>{theme.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

<div class="flex items-start justify-start gap-2 flex-wrap p-2 rounded-md m-2">
	{#each colors as color}
		<div class="flex items-center gap-2">
			<div style={"background-color: var(--color-" + color + ");"} class="size-7 rounded-md"></div>
			<div>{color}</div>
		</div>
	{/each}
</div>

<Button onclick={() => toast("test")}>Test</Button>
