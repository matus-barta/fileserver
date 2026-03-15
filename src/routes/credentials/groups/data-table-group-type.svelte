<script lang="ts">
	import type { GroupEntry } from '$lib/types/creds';
	import { isAdminGroup } from '$lib/utils/groupFilters';

	type Props = {
		group: GroupEntry;
	};

	let { group }: Props = $props();
</script>

{#if isAdminGroup(group)}
	<div class="h-4 w-4 rounded-full bg-amber-300 p-0 dark:bg-amber-500"></div>
{:else if group.members.length > 0}
	<div class="h-4 w-4 rounded-full bg-cyan-400 p-0 dark:bg-cyan-600"></div>
{:else}
	<div class="h-4 w-4 rounded-full bg-sidebar-border"></div>
{/if}
