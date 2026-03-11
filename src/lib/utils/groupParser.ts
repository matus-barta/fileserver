import type { GroupEntry } from '$lib/types/creds';

export interface ParseResult {
	entries: GroupEntry[];
	skipped: string[];
}

export function parseGroup(content: string): ParseResult {
	const entries: GroupEntry[] = [];
	const skipped: string[] = [];

	const lines = content.split('\n');

	for (const rawLine of lines) {
		const line = rawLine.trim();

		if (!line || line.startsWith('#')) continue;

		const parts = line.split(':');

		if (parts.length !== 4) {
			skipped.push(line);
			continue;
		}

		const [groupname, password, gidStr, memberStr] = parts;

		const gid = Number(gidStr);

		if (Number.isNaN(gid)) {
			skipped.push(line);
			continue;
		}

		const members =
			memberStr.trim() === ''
				? []
				: memberStr
						.split(',')
						.map((m) => m.trim())
						.filter(Boolean);

		entries.push({
			groupname,
			password,
			gid,
			members
		});
	}

	return { entries, skipped };
}
