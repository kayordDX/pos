<script lang="ts">
	interface Props {
		value: number;
	}

	let { value }: Props = $props();
</script>

{#if value > 1}
	<div class="bg-secondary text-muted-foreground absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full text-xs">
		{value}
	</div>
{/if}
