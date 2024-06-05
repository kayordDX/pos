<script lang="ts">
	import { BanknoteIcon, CreditCardIcon, NfcIcon, WalletCardsIcon } from "lucide-svelte";

	export let type: string;
</script>

{#if type.toLowerCase() == "cash"}
	<BanknoteIcon class="h-4 w-4" />
{:else if type.toLowerCase() == "halo"}
	<NfcIcon class="h-4 w-4" />
{:else if type.toLowerCase() == "loyalty"}
	<WalletCardsIcon class="h-4 w-4" />
{:else}
	<CreditCardIcon class="h-4 w-4" />
{/if}
