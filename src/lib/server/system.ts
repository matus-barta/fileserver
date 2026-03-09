import os from 'os';
import { readFileSync, statfsSync } from 'fs';
import { parseOsRelease } from '$lib/utils/osRelease';
import si from 'systeminformation';
import { promises as fs } from 'fs';
import path from 'path';

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

export const cpuModel = async () => {
	return si
		.cpu()
		.then((data) => {
			return `${data.manufacturer} ${data.brand} CPU @ ${data.speed} GHz`;
		})
		.catch((error) => {
			console.error(error);
			return '';
		});
};

export const cpuCores = async () => {
	return si
		.cpu()
		.then((data) => {
			return { logical: data.cores, physical: data.physicalCores };
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
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

export async function getFolderSizeRecursive(dir: string): Promise<number> {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	const sizes = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				return getFolderSizeRecursive(fullPath);
			}

			if (entry.isFile()) {
				const stat = await fs.stat(fullPath);
				return stat.size;
			}

			return 0;
		})
	);

	return sizes.reduce((a, b) => a + b, 0);
}
