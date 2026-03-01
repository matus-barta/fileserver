<script lang="ts">
	import { availableMemory, avgCpuUsage, usedMemory } from '$lib/api/stats.remote';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	await setInterval(async () => (cpuUsage = await avgCpuUsage()), 1000);
	await setInterval(async () => (memUsage = await usedMemory()), 1000);

	let cpuUsage = $state(0);
	let memUsage = $state(0);
	let memTotal = await availableMemory();
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
						<span>{memUsage.toFixed(0)}</span>
						<span>/</span>
						<span>{memTotal.toFixed(0)}</span>
						<span>MB</span>
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
					<div class="grid grid-cols-2 items-center gap-x-2 gap-y-1">
						<span>IP</span>
						<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
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
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>OS</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>Uptime</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>CPU model</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>CPU cores</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
					<span>Updates</span>
					<span class="justify-self-end text-sm font-light text-muted-foreground">aaaaa</span>
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
					<span>/</span>
					<Progress value={memUsage} max={memTotal} />
					<div
						class="flex flex-row gap-0.5 justify-self-end text-sm font-light text-muted-foreground"
					>
						<span>{memUsage.toFixed(0)}</span>
						<span>/</span>
						<span>{memTotal.toFixed(0)}</span>
						<span>MB</span>
					</div>

					<span>/mnt/share</span>
					<Progress value={memUsage} max={memTotal} />
					<div
						class="flex flex-row gap-0.5 justify-self-end text-sm font-light text-muted-foreground"
					>
						<span>{memUsage.toFixed(0)}</span>
						<span>/</span>
						<span>{memTotal.toFixed(0)}</span>
						<span>MB</span>
					</div>

					<span>/mnt/media</span>
					<Progress value={memUsage} max={memTotal} />
					<div
						class="flex flex-row gap-0.5 justify-self-end text-sm font-light text-muted-foreground"
					>
						<span>{memUsage.toFixed(0)}</span>
						<span>/</span>
						<span>{memTotal.toFixed(0)}</span>
						<span>MB</span>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
