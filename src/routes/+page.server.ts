import type { PageServerLoad } from './$types';

import { addresses } from '$lib/server/network';
import { cpuCores, cpuModel, uptime, volumeFree, volumeSize } from '$lib/server/system';

export const load: PageServerLoad = async () => {
	return {
		uptime: uptime(),
		addresses: addresses(),
		cpu: {
			model: cpuModel(),
			cores: await cpuCores()
		},
		volumes: [
			{
				path: '/',
				free: volumeFree('/'),
				size: volumeSize('/')
			}
		]
	};
};
