import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import { formatBytes } from '$lib/utils/formatBytes';
import DataTableActions from './data-table-actions.svelte';
import DataTableNameButton from './data-table-name-button.svelte';
import DataTableSizeButton from './data-table-size-button.svelte';
import DataTableModifiedButton from './data-table-modified-button.svelte';
import DataTableCreatedButton from './data-table-created-button.svelte';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import DataTableNodeType from './data-table-node-type.svelte';
import type { Node } from '$lib/types/fs';

export const columns: ColumnDef<Node>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		id: 'type',
		meta: {
			class: 'pr-0 text-right pl-4'
		},
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableNodeType, { type: row.original.type });
		}
	},
	{
		accessorKey: 'name',
		meta: {
			class: 'px-0'
		},
		header: ({ column }) =>
			renderComponent(DataTableNameButton, {
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const nameCellSnippet = createRawSnippet<[{ name: string }]>((getName) => {
				const { name } = getName();
				return {
					render: () => `<div class="font-medium pl-3">${name}</div>`
				};
			});

			return renderSnippet(nameCellSnippet, {
				name: row.original.name
			});
		}
	},
	{
		accessorKey: 'size',
		meta: {
			class: 'text-right'
		},
		header: ({ column }) =>
			renderComponent(DataTableSizeButton, {
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const sizeCellSnippet = createRawSnippet<[{ size: number }]>((getSize) => {
				const { size } = getSize();
				const formatted = formatBytes(size);
				return {
					render: () =>
						`<div class="text-end font-medium pr-3">${formatted.value} ${formatted.unit}</div>`
				};
			});

			return renderSnippet(sizeCellSnippet, {
				size: row.original.size
			});
		}
	},
	{
		accessorKey: 'modified',
		meta: {
			class: 'text-right'
		},
		header: ({ column }) =>
			renderComponent(DataTableModifiedButton, {
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const modifiedCellSnippet = createRawSnippet<[{ modified: Date | null }]>((getModified) => {
				const { modified } = getModified();
				const formatted = modified == null ? '' : modified.toLocaleString();
				return {
					render: () => `<div class="text-end font-medium pr-3">${formatted}</div>`
				};
			});

			return renderSnippet(modifiedCellSnippet, {
				modified: row.original.modified
			});
		}
	},
	{
		accessorKey: 'created',
		meta: {
			class: 'text-right'
		},
		header: ({ column }) =>
			renderComponent(DataTableCreatedButton, {
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const createdCellSnippet = createRawSnippet<[{ created: Date | null }]>((getCreated) => {
				const { created } = getCreated();
				const formatted = created == null ? '' : created.toLocaleString();
				return {
					render: () => `<div class="text-end font-medium pr-3">${formatted}</div>`
				};
			});

			return renderSnippet(createdCellSnippet, {
				created: row.original.created
			});
		}
	},
	{
		id: 'actions',
		meta: {
			class: 'text-right'
		},
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { name: row.original.name });
		}
	}
];
