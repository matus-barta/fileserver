<script lang="ts">
	import Toolbar from '$lib/components/toolbar.svelte';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import SearchIcon from '@lucide/svelte/icons/search';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CornerRightUp from '@lucide/svelte/icons/corner-right-up';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Copy from '@lucide/svelte/icons/copy';
	import Trash2 from '@lucide/svelte/icons/trash-2';

	import { columns, type Node } from './columns';
	import DataTable from './data-table.svelte';
	import type { Table as TanStackTable } from '@tanstack/table-core';

	const nodes: Node[] = [
		{
			type: 'file',
			name: 'aaaaa',
			size: 0,
			modified: 0,
			created: 0
		},
		{
			type: 'file',
			name: 'asdasda',
			size: 0,
			modified: 0,
			created: 0
		}
	];

	let table: TanStackTable<Node> | undefined;
</script>

<Toolbar>
	<ButtonGroup.Root>
		<Button size="icon" variant="outline">
			<ArrowLeft />
		</Button>
		<Button size="icon" variant="outline">
			<ArrowRight />
		</Button>
	</ButtonGroup.Root>
	<Button size="icon" variant="outline">
		<CornerRightUp />
	</Button>
	<Button size="icon" variant="outline">
		<RefreshCw />
	</Button>
	<Button size="icon" variant="outline">
		<Trash2 />
	</Button>
	<ButtonGroup.Root class="w-full">
		<Input value="akask" height={10} />
		<Button size="icon" variant="outline">
			<Copy />
		</Button>
	</ButtonGroup.Root>

	<InputGroup.Root class="max-w-sm">
		<InputGroup.Input
			placeholder="Search by name..."
			value={(table?.getColumn('name')?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table?.getColumn('name')?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table?.getColumn('name')?.setFilterValue(e.currentTarget.value);
			}}
		/>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
	</InputGroup.Root>

	<Select.Root type="single">
		<Select.Trigger class="w-45"></Select.Trigger>
		<Select.Content>
			<Select.Item value="light">Light</Select.Item>
			<Select.Item value="dark">Dark</Select.Item>
			<Select.Item value="system">System</Select.Item>
		</Select.Content>
	</Select.Root>
</Toolbar>

<DataTable data={nodes} {columns} bind:table />
