import { query } from '$app/server';
import { OSUtils } from 'node-os-utils';

const osutils = new OSUtils();

export const avgCpuUsage = query(async () => {
	// Get CPU usage
	const cpuUsage = await osutils.cpu.usage();
	if (cpuUsage.success) {
		return cpuUsage.data;
	}
	return 0;
});

export const usedMemory = query(async () => {
	// Get memory information
	const memInfo = await osutils.memory.info();
	if (memInfo.success) {
		return memInfo.data.used.toBytes();
	}
	return 0;
});

export const availableMemory = query(async () => {
	// Get memory information
	const memInfo = await osutils.memory.info();
	if (memInfo.success) {
		return memInfo.data.total.toBytes();
	}
	return 0;
});
