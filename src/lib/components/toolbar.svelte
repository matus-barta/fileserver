<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { children, class: className = '' } = $props();
</script>

<toolbar
	class={cn('w-full items-center gap-3 rounded-xl border bg-sidebar px-2 py-2.25', className)}
>
	{@render children()}
</toolbar>
