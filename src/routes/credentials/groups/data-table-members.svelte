<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';

	type Props = {
		members: string[];
	};

	const { members }: Props = $props();
</script>

<div class="flex flex-row gap-2">
	{#each members as member (member)}
		<Badge variant="outline" class="font-normal">
			{member}
		</Badge>
	{/each}
</div>
