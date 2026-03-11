<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { PasswdEntry, UserGroup } from '$lib/types/creds';
	import { detectAdminGroup, primaryGroup } from '$lib/utils/groupFilters';

	type Props = {
		user: PasswdEntry;
		groups: UserGroup[];
	};

	const { user, groups }: Props = $props();

	// svelte-ignore state_referenced_locally
	const adminGroups = detectAdminGroup(groups);
	// svelte-ignore state_referenced_locally
	const primaryGroups = primaryGroup(user, groups);
</script>

<div class="flex flex-row gap-2">
	{#each adminGroups as group (group)}
		<Badge variant="outline" class="font-normal text-yellow-500 dark:text-yellow-400">
			{group.name}
		</Badge>
	{/each}
	{#each primaryGroups as group (group)}
		<Badge variant="outline" class="font-normal text-cyan-500">
			{group.name}
		</Badge>
	{/each}
</div>
