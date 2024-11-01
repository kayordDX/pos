<script lang="ts">
	import type { MenuGetSectionsResponse } from "$lib/api";
	import { menuSection } from "$lib/stores/menuSection.svelte";
	import { Breadcrumb } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import type { HTMLAttributes } from "svelte/elements";

	const setSection = (sectionId: number) => {
		menuSection.sectionId = sectionId;
	};

	type ClassNameProp = HTMLAttributes<HTMLElement>;

	interface Props {
		sections: MenuGetSectionsResponse | undefined;
		class?: ClassNameProp["class"];
		children?: import("svelte").Snippet;
	}

	let { sections, class: className = undefined, children }: Props = $props();
</script>

<div class="w-full flex flex-col gap-2 items-center">
	{#if sections != null}
		{#if menuSection.sectionId > 0}
			<Breadcrumb.Root class={cn(className)}>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<button
							onclick={() => {
								setSection(0);
							}}
						>
							<Breadcrumb.Link>Home</Breadcrumb.Link>
						</button>
					</Breadcrumb.Item>
					{#each sections.parents ?? [] as parent, i}
						<Breadcrumb.Separator />

						{#if parent.parent}
							<button onclick={() => setSection(parent?.parent?.menuSectionId ?? 0)}>
								<Breadcrumb.Item>
									<Breadcrumb.Link>{parent.parent.name}</Breadcrumb.Link>
								</Breadcrumb.Item>
							</button>
							<Breadcrumb.Separator />
						{/if}

						<Breadcrumb.Item>
							<button onclick={() => setSection(parent.menuSectionId)}>
								<Breadcrumb.Page>{parent.name}</Breadcrumb.Page>
							</button>
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		{/if}
		{@render children?.()}
	{/if}
</div>
