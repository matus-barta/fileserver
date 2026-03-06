import { networkInterfaces } from 'os';

export function addresses() {
	const interfaces = networkInterfaces();
	const addresses = [];
	for (const iface of Object.values(interfaces)) {
		if (!iface) continue;

		for (const address of iface) {
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address);
			}
		}
	}
	return addresses;
}
