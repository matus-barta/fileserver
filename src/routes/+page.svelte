<script lang="ts">
	import type { PageProps } from './$types';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import { availableMemory, avgCpuUsage, usedMemory } from '$lib/api/stats.remote';

	import { reloadTime } from '$lib/config';
	import { formatUptime } from '$lib/utils/uptimeFormat';
	import { formatBytes } from '$lib/utils/formatBytes';

	let { data }: PageProps = $props();

	await setInterval(async () => (cpuUsage = await avgCpuUsage()), reloadTime);
	await setInterval(async () => (memUsage = await usedMemory()), reloadTime);

	let cpuUsage = $state(0);
	let memUsage = $state(0);
	let memTotal = await availableMemory();

	// svelte-ignore state_referenced_locally
	let uptime = $state(data.uptime);
	await setInterval(async () => (uptime = uptime + 1), 1000);
</script>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
	<div class="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<Card.Title>System Usage</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1">
					<span>CPU</span>
					<Progress value={cpuUsage} />
					<span class="justify-self-end text-sm font-light text-muted-foreground"
						>{cpuUsage.toFixed(2)}%</span
					>

					<span>Memory</span>
					<Progress value={memUsage} max={memTotal} />
					<div
						class="flex flex-row gap-0.5 justify-self-end text-sm font-light text-muted-foreground"
					>
						<span>{formatBytes(memUsage).value}</span>
						<span>/</span>
						<span>{formatBytes(memTotal).value}</span>
						<span>{formatBytes(memTotal).unit}</span>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Network</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-3">
					{#each data.networks as network (network.iface)}
						<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
							<span>{network.iface}</span>
							<span class="justify-self-end text-sm font-light text-muted-foreground">
								{network.address}
							</span>
						</div>
						<Separator />
						<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
							<span>In</span>
							<div class="justify-self-end text-sm font-light text-muted-foreground">
								<span>
									{cpuUsage.toFixed(2)}
								</span>
								<span> kb/s </span>
							</div>
							<span>Out</span>
							<div class="justify-self-end text-sm font-light text-muted-foreground">
								<span>
									{cpuUsage.toFixed(2)}
								</span>
								<span> kb/s </span>
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
				<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
					<span>Hostname</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">
						{data.system.hostname}
					</span>
					<span>OS</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">
						{data.system.prettyName}
					</span>
					<span>Uptime</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">
						{formatUptime(uptime)}
					</span>
					<span>CPU model</span>
					<span class="justify-self-end text-right text-sm font-light text-muted-foreground">
						{data.cpu.model}
					</span>
					<span>CPU cores</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground"
						>{`${data.cpu.cores?.physical}c/${data.cpu.cores?.logical}t`}</span
					>
					<span>Updates</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">TODO</span>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Backup status</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
					<span>Backup 1</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>Backup 2</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>Backup 3</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Volumes</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1">
					{#each data.volumes as volume (volume.path)}
						<span>{volume.path}</span>
						<Progress value={volume.size - volume.free} max={volume.size} />
						<div
							class="flex flex-row gap-0.5 justify-self-end text-sm font-light text-muted-foreground"
						>
							<span>{formatBytes(volume.size - volume.free).value}</span>
							<span>/</span>
							<span>{formatBytes(volume.size).value}</span>
							<span>{formatBytes(volume.size).unit}</span>
						</div>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
