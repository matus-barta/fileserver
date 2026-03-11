import { describe, it, expect } from 'vitest';
import { formatBytes } from '../formatBytes';
describe('formatBytes', () => {
	it('returns bytes for 0', () => {
		expect(formatBytes(0)).toEqual({ value: 0, unit: 'B' });
	});

	it('keeps bytes below 1 KiB', () => {
		expect(formatBytes(512)).toEqual({ value: 512, unit: 'B' });
	});

	it('converts to KiB', () => {
		expect(formatBytes(1024)).toEqual({ value: 1, unit: 'KiB' });
	});

	it('converts to MiB', () => {
		expect(formatBytes(1024 ** 2)).toEqual({ value: 1, unit: 'MiB' });
	});

	it('converts to GiB', () => {
		expect(formatBytes(1024 ** 3)).toEqual({ value: 1, unit: 'GiB' });
	});

	it('handles fractional values', () => {
		expect(formatBytes(1536)).toEqual({ value: 1.5, unit: 'KiB' });
	});

	it('rounds to 2 decimals by default', () => {
		expect(formatBytes(123456789)).toEqual({ value: 117.74, unit: 'MiB' });
	});

	it('respects custom decimal precision', () => {
		expect(formatBytes(1536, 1)).toEqual({ value: 1.5, unit: 'KiB' });
	});

	it('handles very large values', () => {
		expect(formatBytes(1024 ** 4)).toEqual({ value: 1, unit: 'TiB' });
	});
});
