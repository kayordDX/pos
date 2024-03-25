<script lang="ts">
	import type {
		MenuGetItemsGetMenuItemsParams,
		MenuGetSectionsGetMenusSectionsParams,
		MenuGetSectionsResponse,
	} from "$lib/api";
	import { Breadcrumb, Card } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import type { HTMLAttributes } from "svelte/elements";

	export let sections: MenuGetSectionsResponse | undefined;
	export let sectionParams: MenuGetSectionsGetMenusSectionsParams;
	export let itemParams: MenuGetItemsGetMenuItemsParams;
	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		itemParams.sectionId = sectionId;
	};

	type ClassNameProp = HTMLAttributes<HTMLElement>;

	export let className: ClassNameProp["class"] = undefined;
	export { className as class };
</script>

<div class="w-full flex flex-col gap-2 items-center">
	{#if sections != null}
		{#if sectionParams.sectionId > 0}
			<Breadcrumb.Root class={cn(className)}>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<button
							on:click={() => {
								setSection(0);
							}}
						>
							<Breadcrumb.Link>Home</Breadcrumb.Link>
						</button>
					</Breadcrumb.Item>
					{#each sections.parents ?? [] as parent, i}
						<Breadcrumb.Separator />

						{#if parent.parent}
							<button on:click={() => setSection(parent?.parent?.menuSectionId ?? 0)}>
								<Breadcrumb.Item>
									<Breadcrumb.Link>{parent.parent.name}</Breadcrumb.Link>
								</Breadcrumb.Item>
							</button>
							<Breadcrumb.Separator />
						{/if}

						<Breadcrumb.Item>
							<button on:click={() => setSection(parent.menuSectionId)}>
								<Breadcrumb.Page>{parent.name}</Breadcrumb.Page>
							</button>
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		{/if}
		<slot />
	{/if}
</div>
