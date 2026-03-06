import { describe, it, expect } from 'vitest';
import { getInitials } from './userName';

describe('Get correct initials', () => {
	it('Firstname and Lastname', () => {
		expect(getInitials('Janko Hrasko')).toBe('JH');
	});
	it('Firstname and Lastname but it input is lowercase', () => {
		expect(getInitials('janko hrasko')).toBe('JH');
	});
	it('Only one name', () => {
		expect(getInitials('Adele')).toBe('A');
	});
	it('Firstname, Middlename, Lastname', () => {
		expect(getInitials('Jay Jonah Jameson')).toBe('JJJ');
	});
	it('null input', () => {
		expect(getInitials(null)).toBe('');
	});
});

import { parseOsRelease } from './osRelease';

describe('parseOsRelease', () => {
	it('parses basic key-value pairs', () => {
		const input = `
NAME=Ubuntu
VERSION=22.04
ID=ubuntu
`;

		const result = parseOsRelease(input);

		expect(result).toEqual({
			NAME: 'Ubuntu',
			VERSION: '22.04',
			ID: 'ubuntu'
		});
	});

	it('handles quoted values', () => {
		const input = `
NAME="Ubuntu"
PRETTY_NAME="Ubuntu 22.04.3 LTS"
`;

		const result = parseOsRelease(input);

		expect(result).toEqual({
			NAME: 'Ubuntu',
			PRETTY_NAME: 'Ubuntu 22.04.3 LTS'
		});
	});

	it('handles single quotes', () => {
		const input = `
NAME='Ubuntu'
`;

		const result = parseOsRelease(input);

		expect(result.NAME).toBe('Ubuntu');
	});

	it('ignores comments and empty lines', () => {
		const input = `
# This is a comment

NAME=Ubuntu

# Another comment
VERSION=22.04
`;

		const result = parseOsRelease(input);

		expect(result).toEqual({
			NAME: 'Ubuntu',
			VERSION: '22.04'
		});
	});

	it('unescapes escaped characters', () => {
		const input = `
NAME="Ubuntu\\nLinux"
QUOTE="He said: \\"Hello\\""
PATH="C:\\\\Windows"
`;

		const result = parseOsRelease(input);

		expect(result.NAME).toBe('Ubuntu\nLinux');
		expect(result.QUOTE).toBe('He said: "Hello"');
		expect(result.PATH).toBe('C:\\Windows');
	});

	it('uses the last value if key is repeated', () => {
		const input = `
NAME=Ubuntu
NAME=Debian
`;

		const result = parseOsRelease(input);

		expect(result.NAME).toBe('Debian');
	});

	it('ignores malformed lines', () => {
		const input = `
NAME=Ubuntu
INVALID_LINE
ANOTHER INVALID
VERSION=25.04 (Plucky Puffin)
`;

		const result = parseOsRelease(input);

		expect(result).toEqual({
			NAME: 'Ubuntu',
			VERSION: '25.04 (Plucky Puffin)'
		});
	});

	it('handles real-world Ubuntu 25.04 os-release example', () => {
		const input = `
PRETTY_NAME="Ubuntu 25.04"
NAME="Ubuntu"
VERSION_ID="25.04"
VERSION="25.04 (Plucky Puffin)"
VERSION_CODENAME=plucky
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=plucky
LOGO=ubuntu-logo
`;

		const result = parseOsRelease(input);

		expect(result).toEqual({
			PRETTY_NAME: 'Ubuntu 25.04',
			NAME: 'Ubuntu',
			VERSION_ID: '25.04',
			VERSION: '25.04 (Plucky Puffin)',
			VERSION_CODENAME: 'plucky',
			ID: 'ubuntu',
			ID_LIKE: 'debian',
			HOME_URL: 'https://www.ubuntu.com/',
			SUPPORT_URL: 'https://help.ubuntu.com/',
			BUG_REPORT_URL: 'https://bugs.launchpad.net/ubuntu/',
			PRIVACY_POLICY_URL: 'https://www.ubuntu.com/legal/terms-and-policies/privacy-policy',
			UBUNTU_CODENAME: 'plucky',
			LOGO: 'ubuntu-logo'
		});
	});

	it('handles empty input', () => {
		expect(parseOsRelease('')).toEqual({});
	});
});

import { formatUptime } from './uptime';

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
