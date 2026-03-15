import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import type { GroupEntry } from '$lib/types/creds';

import DataTableActions from './data-table-actions.svelte';
import DataTableGroupType from './data-table-group-type.svelte';
import DataTableMembers from './data-table-members.svelte';
import DataTableSortButton from '$lib/components/data-table/data-table-sort-label-button.svelte';

export const columns: ColumnDef<GroupEntry>[] = [
	{
		id: 'type',
		meta: {
			class: 'pr-0 text-right pl-4'
		},
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableGroupType, { group: row.original });
		}
	},
	{
		id: 'groupname',
		accessorFn: (row) => row.groupname,
		filterFn: 'includesString',
		meta: {
			class: 'px-0'
		},
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				label: 'Groupname',
				isSorted: column.getIsSorted(),
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const groupNameCellSnippet = createRawSnippet<[{ groupName: string }]>((getGroupName) => {
				const { groupName } = getGroupName();
				return {
					render: () => `<div class="font-medium pl-3">${groupName}</div>`
				};
			});

			return renderSnippet(groupNameCellSnippet, {
				groupName: row.original.groupname
			});
		}
	},
	{
		id: 'gid',
		accessorFn: (row) => row.gid,
		filterFn: 'includesString',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				label: 'GID',
				isSorted: column.getIsSorted(),
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const idCellSnippet = createRawSnippet<[{ gid: number }]>((getUid) => {
				const { gid } = getUid();
				return {
					render: () => `<div class="font-medium pl-3">${gid}</div>`
				};
			});

			return renderSnippet(idCellSnippet, {
				gid: row.original.gid
			});
		}
	},
	{
		id: 'numOfMembers',
		accessorFn: (row) => row.members.length,
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				label: '# of members',
				isSorted: column.getIsSorted(),
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const numOfMembersCellSnippet = createRawSnippet<[{ numOfMembers: number }]>(
				(getNumOfMembers) => {
					const { numOfMembers } = getNumOfMembers();
					return {
						render: () => `<div class="font-medium pl-3">${numOfMembers}</div>`
					};
				}
			);

			return renderSnippet(numOfMembersCellSnippet, {
				numOfMembers: row.original.members.length
			});
		}
	},
	{
		accessorKey: 'members',
		header: () => {
			const groupsHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="">Members</div>`
			}));
			return renderSnippet(groupsHeaderSnippet);
		},
		cell: ({ row }) => {
			return renderComponent(DataTableMembers, {
				members: row.original.members
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
			return renderComponent(DataTableActions, { name: row.original.groupname });
		}
	}
];
