<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		getCoreRowModel,
		type SortingState,
		getSortedRowModel,
		type ColumnFiltersState,
		getFilteredRowModel,
		type RowSelectionState
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { Table as TanStackTable } from '@tanstack/table-core';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		table?: TanStackTable<TData>;
		sorting?: SortingState;
		onRowClick?: (row: TData) => void;
		onRowDoubleClick?: (row: TData) => void;
	};

	let {
		data,
		columns,
		table = $bindable<TanStackTable<TData>>(),
		sorting: initialSorting = [],
		onRowClick,
		onRowDoubleClick
	}: DataTableProps<TData, TValue> = $props();

	let sorting = $derived(initialSorting);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});

	table = createSvelteTable<TData>({
		get data() {
			return data;
		},

		get columns() {
			return columns;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		onSortingChange: (updater) => {
			const next = typeof updater === 'function' ? updater(sorting) : updater;

			sorting = next;
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});
</script>

<div class="rounded-md border bg-sidebar">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head colspan={header.colSpan} class={header.column.columnDef.meta?.class}>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row
					data-state={row.getIsSelected() && 'selected'}
					onclick={() => onRowClick?.(row.original)}
					ondblclick={() => onRowDoubleClick?.(row.original)}
				>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell class={cell.column.columnDef.meta?.class}>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
