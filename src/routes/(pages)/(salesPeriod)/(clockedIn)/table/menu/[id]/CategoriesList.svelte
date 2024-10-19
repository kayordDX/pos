<script lang="ts">
	import type {
		MenuGetItemsGetMenuItemsParams,
		MenuGetSectionsGetMenusSectionsParams,
		MenuGetSectionsResponse,
	} from "$lib/api";
	import { Breadcrumb, Card } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import type { HTMLAttributes } from "svelte/elements";

	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		itemParams.sectionId = sectionId;
	};

	type ClassNameProp = HTMLAttributes<HTMLElement>;

	interface Props {
		sections: MenuGetSectionsResponse | undefined;
		sectionParams: MenuGetSectionsGetMenusSectionsParams;
		itemParams: MenuGetItemsGetMenuItemsParams;
		class?: ClassNameProp["class"];
		children?: import('svelte').Snippet;
	}

	let {
		sections,
		sectionParams = $bindable(),
		itemParams = $bindable(),
		class: className = undefined,
		children
	}: Props = $props();
	
</script>

<div class="w-full flex flex-col gap-2 items-center">
	{#if sections != null}
		{#if sectionParams.sectionId > 0}
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
