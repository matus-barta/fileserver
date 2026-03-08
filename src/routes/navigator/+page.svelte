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

	import { innerWidth } from 'svelte/reactivity/window';
	import { cn } from '$lib/utils';

	const mounts = [{ value: '/' }, { value: '/mnt/smb' }];

	let mount = $state(mounts[0].value);
	const triggerContent = $derived(mounts.find((f) => f.value === mount)?.value);

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

	// svelte-ignore non_reactive_update
	let table: TanStackTable<Node> | undefined;
</script>

{#snippet navBtns()}
	<div class="flew-row flex w-fit gap-3">
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
	</div>
{/snippet}

{#snippet path(cls: string)}
	<ButtonGroup.Root class={cn(cls)}>
		<Input value="akask" height={10} />
		<Button size="icon" variant="outline">
			<Copy />
		</Button>
	</ButtonGroup.Root>
{/snippet}

{#snippet search(cls: string)}
	<InputGroup.Root class={cn(cls)}>
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
{/snippet}

{#snippet mountPoint(cls?: string)}
	<Select.Root type="single" bind:value={mount}>
		<Select.Trigger class={cn('min-w-40', cls)}>{triggerContent}</Select.Trigger>
		<Select.Content>
			{#each mounts as mount (mount.value)}
				<Select.Item value={mount.value} label={mount.value}>
					{mount.value}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}

<!-- i hate css svelte FTW -->
{#if innerWidth.current != undefined}
	{#if innerWidth.current > 1280}
		<Toolbar class="flex flex-row">
			{@render navBtns()}
			{@render path('flex-2')}
			{@render search('flex-1')}
			{@render mountPoint()}
		</Toolbar>
	{:else if innerWidth.current > 874}
		<Toolbar class="flex flex-col">
			<div class="flex w-full flex-row gap-3">
				{@render navBtns()}
				{@render path('w-full')}
			</div>

			<div class="flex w-full flex-row gap-3">
				{@render search('w-full')}
				{@render mountPoint('w-full')}
			</div>
		</Toolbar>
	{:else if innerWidth.current > 767}
		<Toolbar class="flex flex-col items-start">
			{@render navBtns()}
			{@render path('w-full')}

			{@render search('w-full')}
			{@render mountPoint('w-full')}
		</Toolbar>
	{:else}
		<Toolbar class="flex flex-col">
			<div class="flex w-full flex-row gap-3">
				{@render navBtns()}
				{@render path('w-full')}
			</div>

			<div class="flex w-full flex-row gap-3">
				{@render search('w-full')}
				{@render mountPoint('w-full')}
			</div>
		</Toolbar>
	{/if}
{/if}

<DataTable data={nodes} {columns} bind:table />
