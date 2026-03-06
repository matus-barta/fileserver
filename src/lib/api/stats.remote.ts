import { query } from '$app/server';
import si from 'systeminformation';

export const avgCpuUsage = query(async () => {
	return si
		.currentLoad()
		.then((data) => {
			return data.currentLoad;
		})
		.catch((error) => {
			console.error(error);
			return 0;
		});
});

export const usedMemory = query(async () => {
	return si
		.mem()
		.then((data) => {
			return data.active;
		})
		.catch((error) => {
			console.error(error);
			return 0;
		});
});

export const availableMemory = query(async () => {
	return si
		.mem()
		.then((data) => {
			return data.total;
		})
		.catch((error) => {
			console.error(error);
			return 0;
		});
});
