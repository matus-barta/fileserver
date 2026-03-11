import { describe, it, expect } from 'vitest';
import { parsePasswd } from '../passwdParser';

describe('parsePasswd', () => {
	it('parses valid passwd entries', () => {
		const input = `
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
`;

		const result = parsePasswd(input);

		expect(result.entries).toHaveLength(2);
		expect(result.skipped).toHaveLength(0);

		expect(result.entries[0]).toEqual({
			username: 'root',
			password: 'x',
			uid: 0,
			gid: 0,
			gecos: 'root',
			home: '/root',
			shell: '/bin/bash'
		});
	});

	it('skips malformed lines', () => {
		const input = `
root:x:0:0:root:/root:/bin/bash
badline
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
`;

		const result = parsePasswd(input);

		expect(result.entries).toHaveLength(2);
		expect(result.skipped).toContain('badline');
	});

	it('skips lines with invalid uid or gid', () => {
		const input = `
user:x:notnum:100:user:/home/user:/bin/bash
`;

		const result = parsePasswd(input);

		expect(result.entries).toHaveLength(0);
		expect(result.skipped).toHaveLength(1);
	});

	it('ignores comments and blank lines', () => {
		const input = `
# system users

root:x:0:0:root:/root:/bin/bash

`;

		const result = parsePasswd(input);

		expect(result.entries).toHaveLength(1);
		expect(result.entries[0].username).toBe('root');
	});

	it('collects multiple skipped lines', () => {
		const input = `
bad
also:bad
root:x:0:0:root:/root:/bin/bash
`;

		const result = parsePasswd(input);

		expect(result.entries).toHaveLength(1);
		expect(result.skipped).toHaveLength(2);
	});
});
