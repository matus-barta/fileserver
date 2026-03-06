import os from 'os';
import { readFileSync, statfsSync } from 'fs';
import { parseOsRelease } from '$lib/utils/osRelease';
import { OSUtils } from 'node-os-utils';

export const hostname = () => os.hostname();

export const osPrettyName = () => {
	try {
		const data = readFileSync('/etc/os-release', 'utf-8');
		return parseOsRelease(data).PRETTY_NAME;
	} catch (err) {
		console.error(err);
		return '';
	}
};

export const uptime = () => os.uptime();

export const cpuModel = () => {
	const osutils = new OSUtils();

	return osutils.cpu.model();
};

export const cpuCores = async () => {
	const osutils = new OSUtils();

	const cpuCoreCount = await osutils.cpu.coreCount();
	if (cpuCoreCount.success) {
		return cpuCoreCount.data;
	}
	return null;
};

export const volumeFree = (path: string) => {
	try {
		const stats = statfsSync(path);
		return stats.bfree * stats.bsize;
	} catch (e) {
		console.error(e);
		return 0;
	}
};

export const volumeSize = (path: string) => {
	try {
		const stats = statfsSync(path);

		return stats.blocks * stats.bsize;
	} catch (e) {
		console.error(e);
		return 0;
	}
};
