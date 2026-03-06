export type BitRateUnit = 'bit/s' | 'kb/s' | 'Mb/s' | 'Gb/s' | 'Tb/s';

export interface BitRateResult {
	value: number;
	unit: BitRateUnit;
}

export function formatBitRate(bitsPerSecond: number, decimals = 1): string {
	if (bitsPerSecond === 0) {
		return '0 bit/s';
	}

	const k = 1000;
	const units: BitRateUnit[] = ['bit/s', 'kb/s', 'Mb/s', 'Gb/s', 'Tb/s'];

	const i = Math.min(Math.floor(Math.log(bitsPerSecond) / Math.log(k)), units.length - 1);

	const value = Number((bitsPerSecond / Math.pow(k, i)).toFixed(decimals));

	return `${value} ${units[i]}`;
}
