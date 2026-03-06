export type ByteUnit = 'B' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB';

export interface ByteFormatResult {
	value: number;
	unit: ByteUnit;
}

export function formatBytes(bytes: number, decimals = 2): ByteFormatResult {
	if (bytes === 0) {
		return { value: 0, unit: 'B' };
	}

	const k = 1024;
	const units: ByteUnit[] = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const value = Number((bytes / Math.pow(k, i)).toFixed(decimals));

	return {
		value,
		unit: units[i]
	};
}
