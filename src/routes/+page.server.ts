import type { PageServerLoad } from './$types';

import { networks } from '$lib/server/network';
import { cpuCores, cpuModel, uptime, volumeFree, volumeSize } from '$lib/server/system';

export const load: PageServerLoad = async () => {
	return {
		uptime: uptime(),
		networks: networks(),
		cpu: {
			model: await cpuModel(),
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
