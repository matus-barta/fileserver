import os from 'os';
import { readFileSync } from 'fs';
import { parseOsRelease } from '$lib/utils/osRelease';

export const hostname = () => os.hostname();

export const osPrettyName = () => {
	try {
		const data = readFileSync('/etc/os-release', 'utf-8');
		return parseOsRelease(data).PRETTY_NAME;
	} catch (err) {
		console.error(err);
	}
};
