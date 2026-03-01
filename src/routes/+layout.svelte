<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import DarkModeSwitcher from '$lib/components/dark-mode-switcher.svelte';
	import { Button } from '$lib/components/ui/button';
	import Github from '@lucide/svelte/icons/github';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<Sidebar.Provider style="--sidebar-width: 19rem;">
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center justify-between px-4">
			<div class="flex shrink-0 items-center gap-2">
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				<span>
					{data.system.hostname}
					<span class="text-sm font-light italic">running on</span>
					<span>{data.system.prettyName}</span>
				</span>
			</div>
			<div class="flex gap-2">
				<Button href="https://github.com/matus-barta/fileserver" variant="ghost">
					<Github />
					<span class="truncate text-xs leading-tight text-muted-foreground">{data.ghStars}</span>
				</Button>
				<DarkModeSwitcher />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
