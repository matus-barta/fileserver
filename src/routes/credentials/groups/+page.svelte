<script lang="ts">
	import type { GroupEntry } from '$lib/types/creds';
	import type { PageProps } from './$types';
	import { columns } from './columns';
	import type { Table as TanStackTable } from '@tanstack/table-core';

	import DataTable from '$lib/components/data-table/data-table.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import SearchIcon from '@lucide/svelte/icons/search';
	import Plus from '@lucide/svelte/icons/plus';

	let { data }: PageProps = $props();

	// svelte-ignore non_reactive_update
	let table: TanStackTable<GroupEntry> | undefined;
</script>

<Toolbar class="flex flex-row">
	<Button variant="outline" class="font-light">
		<Plus /> Add Group
	</Button>

	<InputGroup.Root class="flex-1">
		<InputGroup.Input
			placeholder="Search by username..."
			value={(table?.getColumn('username')?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table?.getColumn('username')?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table?.getColumn('username')?.setFilterValue(e.currentTarget.value);
			}}
		/>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
	</InputGroup.Root>
</Toolbar>

{#if data.groups}
	<DataTable
		data={data.groups}
		{columns}
		bind:table
		sorting={[{ id: 'numOfMembers', desc: true }]}
	/>
{/if}
