import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import { formatBytes } from '$lib/utils/formatBytes';
import DataTableActions from './data-table-actions.svelte';

export type Node = {
	type: 'file' | 'folder';
	name: string;
	size: number;
	modified: number;
	created: number;
};

export const columns: ColumnDef<Node>[] = [
	{
		accessorKey: 'name',
		header: 'Name'
	},
	{
		accessorKey: 'size',
		header: () => {
			const sizeHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-end">Size</div>`
			}));
			return renderSnippet(sizeHeaderSnippet);
		},
		cell: ({ row }) => {
			const sizeCellSnippet = createRawSnippet<[{ size: number }]>((getSize) => {
				const { size } = getSize();
				const formatted = formatBytes(size);
				return {
					render: () =>
						`<div class="text-end font-medium">${formatted.value} ${formatted.unit}</div>`
				};
			});

			return renderSnippet(sizeCellSnippet, {
				size: row.original.size
			});
		}
	},
	{
		accessorKey: 'modified',
		header: () => {
			const modifiedHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-end">Modified</div>`
			}));
			return renderSnippet(modifiedHeaderSnippet);
		},
		cell: ({ row }) => {
			const modifiedCellSnippet = createRawSnippet<[{ modified: number }]>((getModified) => {
				const { modified } = getModified();
				const formatted = modified;
				return {
					render: () => `<div class="text-end font-medium">${formatted}</div>`
				};
			});

			return renderSnippet(modifiedCellSnippet, {
				modified: row.original.modified
			});
		}
	},
	{
		accessorKey: 'created',
		header: () => {
			const createdHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-end">Created</div>`
			}));
			return renderSnippet(createdHeaderSnippet);
		},
		cell: ({ row }) => {
			const createdCellSnippet = createRawSnippet<[{ created: number }]>((getCreated) => {
				const { created } = getCreated();
				const formatted = created;
				return {
					render: () => `<div class="text-end font-medium">${formatted}</div>`
				};
			});

			return renderSnippet(createdCellSnippet, {
				created: row.original.created
			});
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { name: row.original.name });
		}
	}
];
