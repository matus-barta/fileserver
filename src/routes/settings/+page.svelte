<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { mounts, AppName, Version, reloadTime } from '$lib/config';
</script>

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-3xl">
		<Card.Header>
			<Card.Title>Volumes</Card.Title>
		</Card.Header>
		<Card.Content>
			{#each mounts as mount (mount.value)}
				<p>{mount.value}</p>
			{/each}
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-3xl">
		<Card.Header>
			<Card.Title>Accounts</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>to allow access to dashboard</p>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-3xl">
		<Card.Header>
			<Card.Title>Misc</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{`Reload time: ${reloadTime / 1000}s`}</p>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-3xl">
		<Card.Header>
			<Card.Title>About</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{`${AppName} ${Version}`}</p>
			<p>Author: Matus Barta</p>
			<a href="https://github.com/matus-barta/fileserver">Github</a>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-3xl">
		<Card.Header>
			<Card.Title>Changes</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{`Initial release ${Version}`}</p>
			<p>idk...</p>
		</Card.Content>
	</Card.Root>
</div>
