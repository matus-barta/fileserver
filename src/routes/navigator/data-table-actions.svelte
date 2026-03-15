<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	let { name }: { name: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item>Rename</DropdownMenu.Item>
		<DropdownMenu.Item disabled={true}>Move To</DropdownMenu.Item>
		<DropdownMenu.Item disabled={true}>Copy To</DropdownMenu.Item>
		<DropdownMenu.Item variant="destructive" onclick={() => navigator.clipboard.writeText(name)}>
			Delete
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item disabled={true}>Download</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Properties</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
