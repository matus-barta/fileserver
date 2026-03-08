<script>
	import Toolbar from '$lib/components/toolbar.svelte';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CornerRightUp from '@lucide/svelte/icons/corner-right-up';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import Copy from '@lucide/svelte/icons/copy';
</script>

<Toolbar>
	<ButtonGroup.Root>
		<Button size="icon" variant="outline">
			<ArrowLeft />
		</Button>
		<Button size="icon" variant="outline">
			<ArrowRight />
		</Button>
	</ButtonGroup.Root>
	<Button size="icon" variant="outline">
		<CornerRightUp />
	</Button>
	<Button size="icon" variant="outline">
		<RefreshCw />
	</Button>
	<ButtonGroup.Root class="w-full">
		<Input value="akask" height={10} />
		<Button size="icon" variant="outline">
			<Copy />
		</Button>
	</ButtonGroup.Root>
</Toolbar>

<navigator> </navigator>
