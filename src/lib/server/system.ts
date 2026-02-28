import os from 'os';
import fs from 'fs';

export const hostname = () => os.hostname();

export const osRelease = () => {
	try {
		const data = fs.readFileSync('/etc/os-release', 'utf-8');
		console.log(data);
	} catch (err) {
		console.error(err);
	}
};
