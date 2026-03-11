<script lang="ts">
	import { page } from '$app/state';
	import { AppName, Version } from '$lib/config';
	import type { Component, ComponentProps } from 'svelte';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import NavUser from './nav-user.svelte';
	import Separator from './ui/separator/separator.svelte';

	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import Server from '@lucide/svelte/icons/server';
	import Folder from '@lucide/svelte/icons/folder';
	import Share2 from '@lucide/svelte/icons/share-2';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';
	import History from '@lucide/svelte/icons/history';
	import { resolve } from '$app/paths';

	interface navBar {
		navMain: {
			title: string;
			url: string;
			icon: Component;
			items: { title: string; url: string }[];
		}[];
		user: {
			email: string;
			name: string;
			avatar: string;
		};
	}

	const data: navBar = {
		navMain: [
			{
				title: 'Navigator',
				url: '/navigator',
				icon: Folder,
				items: []
			},
			{
				title: 'Credentials',
				url: '/credentials',
				icon: User,
				items: [
					{ title: 'Users', url: '/credentials/users' },
					{ title: 'Groups', url: '/credentials/groups' }
				]
			},
			{
				title: 'Shares',
				url: '/share',
				icon: Share2,
				items: [
					{ title: 'SMB', url: '/shares/smb' },
					{ title: 'NFS', url: '/shares/nfs' },
					{ title: 'iSCSI', url: '/shares/iscsi' }
				]
			},
			{
				title: 'Backup',
				icon: History,
				url: '/backup',
				items: []
			},
			{
				title: 'Settings',
				icon: Settings,
				url: '/settings',
				items: []
			}
		],
		user: {
			avatar: 'https://github.com/shadcn.png',
			email: 'email@email.com',
			name: 'ShadCN'
		}
	};

	function isApp(title: string) {
		return page.url.pathname.includes(title);
	}

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root variant="floating" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href={resolve('/')} {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<Server class="size-4" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-medium">{AppName}</span>
								<span class="">{Version}</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Separator />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu class="gap-2">
				{#each data.navMain as item (item.title)}
					{#if item.items?.length}
						<Collapsible.Root open={isApp(item.url)} class="group/collapsible">
							{#snippet child({ props })}
								<Sidebar.MenuItem {...props}>
									<Collapsible.Trigger>
										{#snippet child({ props })}
											<Sidebar.MenuButton {...props} tooltipContent={item.title}>
												<item.icon />
												<span>{item.title}</span>
												<ChevronRightIcon
													class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
												/>
											</Sidebar.MenuButton>
										{/snippet}
									</Collapsible.Trigger>
									<Collapsible.Content>
										<Sidebar.MenuSub>
											{#each item.items ?? [] as subItem (subItem.title)}
												<Sidebar.MenuSubItem>
													<Sidebar.MenuSubButton isActive={isApp(subItem.url)}>
														{#snippet child({ props })}
															// eslint-disable-next-line svelte/no-navigation-without-resolve
															<a href={subItem.url} {...props}>
																<span>{subItem.title}</span>
															</a>
														{/snippet}
													</Sidebar.MenuSubButton>
												</Sidebar.MenuSubItem>
											{/each}
										</Sidebar.MenuSub>
									</Collapsible.Content>
								</Sidebar.MenuItem>
							{/snippet}
						</Collapsible.Root>
					{:else}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={isApp(item.url)}>
								{#snippet child({ props })}
									// eslint-disable-next-line svelte/no-navigation-without-resolve
									<a href={item.url} class="font-medium" {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/if}
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Separator />
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
