<script lang="ts">
	import { BanknoteIcon, CreditCardIcon, NfcIcon, WalletCardsIcon } from "lucide-svelte";

	export let type: string;
</script>

{#if type.toLowerCase().includes("cash")}
	<BanknoteIcon class="h-4 w-4 " />
{:else if type.toLowerCase().includes("halo")}
	<NfcIcon class="h-4 w-4" />
{:else if type.toLowerCase().includes("loyalty")}
	<WalletCardsIcon class="h-4 w-4" />
{:else}
	<CreditCardIcon class="h-4 w-4" />
{/if}
