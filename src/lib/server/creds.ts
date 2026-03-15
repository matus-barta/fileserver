import { hideRoot } from '$lib/config';
import type { GroupEntry, PasswdEntry, UserGroup } from '$lib/types/creds';
import { parseGroup } from '$lib/utils/groupParser';
import { parsePasswd } from '$lib/utils/passwdParser';
import { readFileSync } from 'fs';

export const getUsers = (): PasswdEntry[] => {
	let content;

	try {
		content = readFileSync('/etc/passwd', 'utf8');
	} catch (e) {
		console.error(e);
	}

	if (content) {
		const { entries, skipped } = parsePasswd(content);

		if (skipped.length > 0) {
			console.warn('Skipped malformed lines:', skipped);
		}

		return entries;
	}
	return [];
};

export function getRealUsers(entries: PasswdEntry[]): PasswdEntry[] {
	return entries.filter(isRealUser);
}

export function getServiceAccounts(entries: PasswdEntry[]): PasswdEntry[] {
	return entries.filter((e) => !isRealUser(e));
}

export function isRealUser(entry: PasswdEntry, uidMin = 1000): boolean {
	if (entry.username == 'root') return !hideRoot;

	if (entry.uid < uidMin) return false;
	if (entry.home.startsWith('/home/') === false) return false;

	const nologin = ['nologin', 'false'];
	if (nologin.some((s) => entry.shell.includes(s))) return false;

	return true;
}

export function getGroups(): GroupEntry[] {
	let content;

	try {
		content = readFileSync('/etc/group', 'utf8');
	} catch (e) {
		console.error(e);
	}

	if (content) {
		const { entries, skipped } = parseGroup(content);

		if (skipped.length > 0) {
			console.warn('Skipped malformed lines:', skipped);
		}

		return entries;
	}
	return [];
}

export function getUserGroups(
	username: string,
	passwdEntries: PasswdEntry[],
	groupEntries: GroupEntry[]
): UserGroup[] {
	const user = passwdEntries.find((u) => u.username === username);

	if (!user) return [];

	const groups: UserGroup[] = [];

	// primary group
	const primary = groupEntries.find((g) => g.gid === user.gid);
	if (primary) {
		groups.push({ name: primary.groupname, gid: primary.gid });
	} else {
		groups.push({ name: String(user.gid), gid: user.gid });
	}

	//supplementary groups
	for (const group of groupEntries) {
		if (group.members.includes(username) && group.gid !== user.gid) {
			groups.push({
				name: group.groupname,
				gid: group.gid
			});
		}
	}

	return groups;
}
