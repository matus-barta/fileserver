import { describe, it, expect } from 'vitest';
import { formatUptime } from '../uptimeFormat';

describe('formatUptime', () => {
	it('formats seconds only', () => {
		expect(formatUptime(45)).toBe('45s');
	});

	it('formats minutes and seconds', () => {
		expect(formatUptime(125)).toBe('2m 5s');
	});

	it('formats hours minutes seconds', () => {
		expect(formatUptime(3665)).toBe('1h 1m 5s');
	});

	it('formats days hours minutes seconds', () => {
		expect(formatUptime(90061)).toBe('1d 1h 1m 1s');
	});

	it('formats exact hour', () => {
		expect(formatUptime(3600)).toBe('1h');
	});

	it('formats exact day', () => {
		expect(formatUptime(86400)).toBe('1d');
	});

	it('returns empty string for 0 seconds', () => {
		expect(formatUptime(0)).toBe('');
	});

	it('handles large values', () => {
		expect(formatUptime(172800)).toBe('2d');
	});
});
