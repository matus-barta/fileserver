<script lang="ts">
	import File from '@lucide/svelte/icons/file';
	import Folder from '@lucide/svelte/icons/folder';

	type Props = {
		type: 'file' | 'folder';
	};

	let { type }: Props = $props();
</script>

{#if type == 'file'}
	<File size="16" />
{:else if type == 'folder'}
	<Folder size="16" />
{/if}
