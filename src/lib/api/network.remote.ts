import { query } from '$app/server';
import si from 'systeminformation';

export const networkStats = query(async (): Promise<NetStatMap | null> => {
	return si
		.networkStats('*')
		.then((data) => {
			return Object.fromEntries(data.map((i) => [i.iface, i])) as NetStatMap;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
});

export interface NetStat {
	iface: string;
	operstate: string;
	rx_bytes: number;
	tx_bytes: number;
	rx_sec: number;
	tx_sec: number;
	ms: number;
}

export type NetStatMap = Record<string, NetStat>;
