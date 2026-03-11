<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { loggedin } from '$lib/config';
	type Props = { username: string };

	const { username }: Props = $props();
</script>

<div class="flex flex-row gap-3 pl-3 font-medium">
	{username}
	{#if username == loggedin}
		<Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">Your account</Badge>
	{/if}
</div>
