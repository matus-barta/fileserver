import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import type { UserWithGroups } from '$lib/types/creds';

import DataTableActions from './data-table-actions.svelte';
import DataTableGroups from './data-table-groups.svelte';
import DataTableSortButton from '$lib/components/data-table/data-table-sort-label-button.svelte';
import DataTableUserName from './data-table-username.svelte';

export const columns: ColumnDef<UserWithGroups>[] = [
	{
		id: 'username',
		accessorFn: (row) => row.user.username,
		filterFn: 'includesString',
		meta: {
			class: 'px-0'
		},
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				label: 'Username',
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) =>
			renderComponent(DataTableUserName, {
				username: row.original.user.username
			})
	},
	{
		id: 'uid',
		accessorFn: (row) => row.user.uid,
		filterFn: 'includesString',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				label: 'UID',
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const idCellSnippet = createRawSnippet<[{ uid: number }]>((getUid) => {
				const { uid } = getUid();
				return {
					render: () => `<div class="font-medium pl-3">${uid}</div>`
				};
			});

			return renderSnippet(idCellSnippet, {
				uid: row.original.user.uid
			});
		}
	},
	{
		accessorKey: 'home',
		header: () => {
			const homeHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="">Home</div>`
			}));
			return renderSnippet(homeHeaderSnippet);
		},
		cell: ({ row }) => {
			const homeCellSnippet = createRawSnippet<[{ home: string }]>((getHome) => {
				const { home } = getHome();
				return {
					render: () => `<div class="font-medium pl-1">${home}</div>`
				};
			});

			return renderSnippet(homeCellSnippet, {
				home: row.original.user.home
			});
		}
	},
	{
		accessorKey: 'shell',
		header: () => {
			const shellHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="">Shell</div>`
			}));
			return renderSnippet(shellHeaderSnippet);
		},
		cell: ({ row }) => {
			const shellCellSnippet = createRawSnippet<[{ shell: string }]>((getShell) => {
				const { shell } = getShell();
				return {
					render: () => `<div class="font-medium pl-1">${shell}</div>`
				};
			});

			return renderSnippet(shellCellSnippet, {
				shell: row.original.user.shell
			});
		}
	},
	{
		accessorKey: 'groups',
		header: () => {
			const groupsHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="">Groups</div>`
			}));
			return renderSnippet(groupsHeaderSnippet);
		},
		cell: ({ row }) => {
			return renderComponent(DataTableGroups, {
				groups: row.original.groups,
				user: row.original.user
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
			return renderComponent(DataTableActions, { name: row.original.user.username });
		}
	}
];
