<script lang="ts">
	let { children } = $props();
</script>

<toolbar class="flex h-14 w-full flex-row items-center gap-3 rounded-xl border bg-sidebar px-2">
	{@render children()}
</toolbar>
