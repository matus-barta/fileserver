import { networkInterfaces } from 'os';
export interface AddressInfo {
	iface: string;
	address: string;
}

export function networks(): AddressInfo[] {
	const interfaces = networkInterfaces();
	const result: AddressInfo[] = [];

	for (const [name, iface] of Object.entries(interfaces)) {
		if (!iface) continue;

		for (const addr of iface) {
			if (addr.family === 'IPv4' && !addr.internal) {
				result.push({ iface: name, address: addr.address });
			}
		}
	}

	return result;
}
