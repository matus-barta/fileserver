<script lang="ts">
	import File from '@lucide/svelte/icons/file';
	import Folder from '@lucide/svelte/icons/folder';
	import Symlink from '@lucide/svelte/icons/folder-symlink';

	type Props = {
		type: 'file' | 'folder' | 'symlink' | null;
	};

	let { type }: Props = $props();
</script>

{#if type == 'file'}
	<File size="16" />
{:else if type == 'folder'}
	<Folder size="16" />
{:else if type == 'symlink'}
	<Symlink size="16" />
{/if}
