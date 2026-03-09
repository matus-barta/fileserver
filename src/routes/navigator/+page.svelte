<script lang="ts">
	import Toolbar from '$lib/components/toolbar.svelte';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	// import { Label } from '$lib/components/ui/label/index.js';
	// import { Switch } from '$lib/components/ui/switch/index.js';

	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import SearchIcon from '@lucide/svelte/icons/search';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CornerRightUp from '@lucide/svelte/icons/corner-right-up';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Copy from '@lucide/svelte/icons/copy';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import House from '@lucide/svelte/icons/house';

	import { columns } from './columns';
	import type { Node } from '$lib/types/fs';
	import DataTable from '$lib/components/data-table/data-table.svelte';
	import type { Table as TanStackTable } from '@tanstack/table-core';

	import { innerWidth } from 'svelte/reactivity/window';
	import { cn } from '$lib/utils';
	import { mounts } from '$lib/config';
	import { list } from '$lib/api/navigator.remote';

	let mount = $state(mounts[0].value);
	const triggerContent = $derived(mounts.find((f) => f.value === mount)?.value);

	let history: string[] = $derived([mount]);
	let historyIndex = $state(0);

	let path = $derived(history[historyIndex]);
	let tempPath = $derived(path);

	$effect(() => {
		const item = localStorage.getItem('path');
		if (item) path = JSON.parse(item);
	});

	$effect(() => {
		localStorage.setItem('path', JSON.stringify(path));
	});

	let folderSize = $state(false);
	const nodes = $derived(await list({ path, folderSize }));

	// svelte-ignore non_reactive_update
	let table: TanStackTable<Node> | undefined;

	function changeMount(mount: string) {
		history = [mount];
		historyIndex = 0;
	}

	function navigate(folder: string) {
		const newPath = `${path.replace(/\/$/, '')}/${folder}/`; //This prevents accidental //
		// remove any "forward" history
		history = history.slice(0, historyIndex + 1);

		history.push(newPath);
		historyIndex++;

		path = newPath;
	}

	function backward() {
		if (historyIndex === 0) return;

		historyIndex--;
		path = history[historyIndex];
	}

	function forward() {
		if (historyIndex >= history.length - 1) return;

		historyIndex++;
		path = history[historyIndex];
	}
	function up() {
		if (path === '/') return;

		const segments = path.split('/').filter(Boolean);
		segments.pop();

		const newPath = '/' + (segments.length ? segments.join('/') + '/' : '');

		// remove forward history
		history = history.slice(0, historyIndex + 1);

		history.push(newPath);
		historyIndex++;

		path = newPath;
	}

	function canGoBack() {
		return historyIndex > 0;
	}

	function canGoForward() {
		return historyIndex < history.length - 1;
	}

	// User confirms a path (Enter or blur)
	function confirmPath() {
		if (tempPath === path) return;

		// remove any "forward" history
		history = history.slice(0, historyIndex + 1);
		history.push(tempPath);
		historyIndex++;
		path = tempPath;
	}

	function handleSelect(node: Node) {
		if (node.type !== 'file') navigate(node.name);
	}
</script>

{#snippet navBtns()}
	<div class="flew-row flex w-fit gap-3">
		<ButtonGroup.Root>
			<Button size="icon" variant="outline" onclick={() => backward()} disabled={!canGoBack()}>
				<ArrowLeft />
			</Button>
			<Button size="icon" variant="outline" onclick={() => forward()} disabled={!canGoForward()}>
				<ArrowRight />
			</Button>
		</ButtonGroup.Root>
		<Button size="icon" variant="outline" onclick={() => up()} disabled={path == '/'}>
			<CornerRightUp />
		</Button>
		<Button size="icon" variant="outline">
			<RefreshCw />
		</Button>
		<Button
			size="icon"
			variant="outline"
			onclick={() => {
				changeMount(mount);
			}}
		>
			<House />
		</Button>
		<Button size="icon" variant="outline">
			<Trash2 />
		</Button>
		<!-- <div
			class="flex h-9 w-fit flex-none items-center space-x-2 rounded-md border bg-background px-2 shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
		>
			<Switch id="airplane-mode" bind:checked={folderSize} />
			<Label for="airplane-mode" class="text-xs font-light text-muted-foreground"
				>Folder size (slow)</Label
			>
		</div> -->
	</div>
{/snippet}

{#snippet pathSnippet(cls: string)}
	<ButtonGroup.Root class={cn(cls)}>
		<Input
			bind:value={tempPath}
			height={10}
			class="font-light"
			onkeydown={(e) => {
				if (e.key == 'Enter') confirmPath();
			}}
		/>
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
	<Select.Root type="single" bind:value={mount} onValueChange={() => changeMount(mount)}>
		<Select.Trigger class={cn('min-w-40', cls)}>{triggerContent}</Select.Trigger>
		<Select.Content>
			<Select.Label>Change mount point</Select.Label>
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
			{@render pathSnippet('flex-2')}
			{@render search('flex-1')}
			{@render mountPoint()}
		</Toolbar>
	{:else if innerWidth.current > 874}
		<Toolbar class="flex flex-col">
			<div class="flex w-full flex-row gap-3">
				{@render navBtns()}
				{@render pathSnippet('w-full')}
			</div>

			<div class="flex w-full flex-row gap-3">
				{@render search('w-full')}
				{@render mountPoint('w-full')}
			</div>
		</Toolbar>
	{:else if innerWidth.current > 767}
		<Toolbar class="flex flex-col items-start">
			{@render navBtns()}
			{@render pathSnippet('w-full')}

			{@render search('w-full')}
			{@render mountPoint('w-full')}
		</Toolbar>
	{:else}
		<Toolbar class="flex flex-col">
			<div class="flex w-full flex-row gap-3">
				{@render navBtns()}
				{@render pathSnippet('w-full')}
			</div>

			<div class="flex w-full flex-row gap-3">
				{@render search('w-full')}
				{@render mountPoint('w-full')}
			</div>
		</Toolbar>
	{/if}
{/if}

<DataTable data={nodes} {columns} bind:table onRowDoubleClick={handleSelect} />
