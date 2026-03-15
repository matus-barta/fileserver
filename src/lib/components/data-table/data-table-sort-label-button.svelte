<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { SortDirection } from '@tanstack/table-core';

	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import ArrowUpIcon from '@lucide/svelte/icons/move-up';
	import ArrowDownIcon from '@lucide/svelte/icons/move-down';

	let {
		label,
		isSorted,
		variant = 'ghost',
		...restProps
	}: ComponentProps<typeof Button> & {
		label: string;
		isSorted: false | SortDirection;
	} = $props();
</script>

<Button {variant} {...restProps}>
	{label}
	{#if isSorted == false}
		<ArrowUpDownIcon class="ms-2" />
	{:else if isSorted == 'asc'}
		<ArrowUpIcon class="ms-2" />
	{:else if isSorted == 'desc'}
		<ArrowDownIcon class="ms-2" />
	{/if}
</Button>
