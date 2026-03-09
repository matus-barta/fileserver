<script lang="ts">
	import type { PageProps } from './$types';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	import { availableMemory, avgCpuUsage, usedMemory } from '$lib/api/stats.remote';

	import { reloadTime } from '$lib/config';
	import { formatUptime } from '$lib/utils/uptimeFormat';
	import { formatBytes, type ByteFormatResult } from '$lib/utils/formatBytes';
	import { networkStats, type NetStatMap } from '$lib/api/network.remote';
	import { formatBitRate } from '$lib/utils/formatBitRate';

	let { data }: PageProps = $props();

	let memTotal = formatBytes(await availableMemory());

	let cpuUsage = $state(0);
	let memUsage = $state<ByteFormatResult>();
	await setInterval(async () => (cpuUsage = await avgCpuUsage()), reloadTime);
	await setInterval(async () => (memUsage = formatBytes(await usedMemory())), reloadTime);

	let networksStats = $state<NetStatMap | null>(null);
	await setInterval(async () => (networksStats = await networkStats()), reloadTime);

	// svelte-ignore state_referenced_locally
	let uptime = $state(data.uptime);
	await setInterval(async () => (uptime = uptime + 1), 1000);
</script>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<div class="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>System Usage</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if memUsage}
					<div
						class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1 text-sm font-light"
					>
						<span>CPU</span>
						<Progress value={cpuUsage} />
						<span class="justify-self-end text-muted-foreground">{cpuUsage.toFixed(2)}%</span>

						<span>Memory</span>
						<Progress value={memUsage.value} max={memTotal.value} />
						<div class="flex flex-row gap-0.5 justify-self-end text-muted-foreground">
							<span>{`${memUsage.value} ${memUsage.unit}`}</span>
							<span>/</span>
							<span>{`${memTotal.value} ${memTotal.unit}`}</span>
						</div>
					</div>
				{:else}
					<div class="flex flex-col gap-2">
						<Skeleton class="h-2 w-full py-2" />
						<Skeleton class="h-2 w-full py-2" />
					</div>
				{/if}
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Volumes</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1 text-sm font-light">
					{#each data.volumes as volume (volume.path)}
						{@const volumeUsedFmt = formatBytes(volume.size - volume.free)}
						{@const volumeSizeFmt = formatBytes(volume.size)}
						<span>{volume.path}</span>
						<Progress value={volume.size - volume.free} max={volume.size} />
						<div class="flex flex-row gap-0.5 justify-self-end text-muted-foreground">
							<span>{`${volumeUsedFmt.value} ${volumeUsedFmt.unit}`}</span>
							<span>/</span>
							<span>{`${volumeSizeFmt.value} ${volumeSizeFmt.unit}`}</span>
						</div>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<Card.Title>Network</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-3 text-sm font-light">
					{#each data.networks as network (network.iface)}
						<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
							<span>{network.iface}</span>
							<span class="justify-self-end text-muted-foreground">
								{network.address}
							</span>
						</div>
						<Separator />
						<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
							<span>In</span>
							<div class="justify-self-end text-muted-foreground">
								{#if networksStats}
									<span>
										{formatBitRate(networksStats[network.iface]?.rx_sec)}
									</span>
								{:else}
									<Skeleton class="h-2 w-20 py-2" />
								{/if}
							</div>
							<span>Out</span>
							<div class="justify-self-end text-muted-foreground">
								{#if networksStats}
									<span>
										{formatBitRate(networksStats[network.iface]?.tx_sec)}
									</span>
								{:else}
									<Skeleton class="h-2 w-20 py-2" />
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>System info</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1 text-sm font-light">
					<span>Hostname</span>
					<span class="justify-self-end text-muted-foreground">
						{data.system.hostname}
					</span>
					<span>OS</span>
					<span class="justify-self-end text-muted-foreground">
						{data.system.prettyName}
					</span>
					<span>Uptime</span>
					<span class="justify-self-end text-muted-foreground">
						{formatUptime(uptime)}
					</span>
					<span>CPU model</span>
					<span class="justify-self-end text-right text-muted-foreground">
						{data.cpu.model}
					</span>
					<span>CPU cores</span>
					<span class="justify-self-end text-muted-foreground"
						>{`${data.cpu.cores?.physical}c/${data.cpu.cores?.logical}t`}</span
					>
					<span>Updates</span>
					<span class="justify-self-end text-muted-foreground">TODO</span>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Backup status</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1 text-sm font-light">
					<span>Backup 1</span>
					<span class="justify-self-end text-muted-foreground">aaaaa</span>
					<span>Backup 2</span>
					<span class="justify-self-end text-muted-foreground">aaaaa</span>
					<span>Backup 3</span>
					<span class="justify-self-end text-muted-foreground">aaaaa</span>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
