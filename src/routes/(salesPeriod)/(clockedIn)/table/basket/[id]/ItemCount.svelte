<script lang="ts">
	export let value: number;
</script>

{#if value > 1}
	<div
		class="flex justify-center size-5 bg-secondary absolute top-0.5 right-0.5 rounded-full text-xs items-center text-muted-foreground"
	>
		{value}
	</div>
{/if}
