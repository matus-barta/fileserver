import { describe, it, expect } from 'vitest';
import { parseGroup } from '../groupParser';

describe('parseGroup', () => {
	it('parses valid group entries', () => {
		const input = `
root:x:0:
wheel:x:10:root,user1
docker:x:999:user1,user2
`;

		const result = parseGroup(input);

		expect(result.skipped).toEqual([]);
		expect(result.entries).toEqual([
			{
				groupname: 'root',
				password: 'x',
				gid: 0,
				members: []
			},
			{
				groupname: 'wheel',
				password: 'x',
				gid: 10,
				members: ['root', 'user1']
			},
			{
				groupname: 'docker',
				password: 'x',
				gid: 999,
				members: ['user1', 'user2']
			}
		]);
	});

	it('ignores comments and empty lines', () => {
		const input = `
# system groups

root:x:0:

# admin group
wheel:x:10:root
`;

		const result = parseGroup(input);

		expect(result.entries.length).toBe(2);
		expect(result.entries[0].groupname).toBe('root');
		expect(result.entries[1].groupname).toBe('wheel');
		expect(result.skipped).toEqual([]);
	});

	it('skips lines with invalid field count', () => {
		const input = `
valid:x:1:user
invalid:x
another:bad:line
`;

		const result = parseGroup(input);

		expect(result.entries).toEqual([
			{
				groupname: 'valid',
				password: 'x',
				gid: 1,
				members: ['user']
			}
		]);

		expect(result.skipped).toEqual(['invalid:x', 'another:bad:line']);
	});

	it('skips lines with non-numeric gid', () => {
		const input = `
wheel:x:notanumber:root
docker:x:999:user
`;

		const result = parseGroup(input);

		expect(result.entries).toEqual([
			{
				groupname: 'docker',
				password: 'x',
				gid: 999,
				members: ['user']
			}
		]);

		expect(result.skipped).toEqual(['wheel:x:notanumber:root']);
	});

	it('trims and filters member list', () => {
		const input = `
devs:x:1000:user1, user2 , ,user3
`;

		const result = parseGroup(input);

		expect(result.entries[0]).toEqual({
			groupname: 'devs',
			password: 'x',
			gid: 1000,
			members: ['user1', 'user2', 'user3']
		});
	});
});
