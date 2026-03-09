import type { PageServerLoad } from './$types';

import { networks } from '$lib/server/network';
import { cpuCores, cpuModel, uptime, volumeFree, volumeSize } from '$lib/server/system';
import { mounts } from '$lib/config';

export const load: PageServerLoad = async () => {
	type Volume = {
		path: string;
		free: number;
		size: number;
	};

	const volumes: Volume[] = [];

	mounts.forEach(({ value }) => {
		volumes.push({
			path: value,
			free: volumeFree(value),
			size: volumeSize(value)
		});
	});

	return {
		uptime: uptime(),
		networks: networks(),
		cpu: {
			model: await cpuModel(),
			cores: await cpuCores()
		},
		volumes
	};
};
