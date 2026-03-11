import { parsePasswd, type PasswdEntry } from '$lib/utils/passwdParser';
import { readFileSync } from 'fs';

export const getUsers = () => {
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
	return null;
};

export function getRealUsers(entries: PasswdEntry[]): PasswdEntry[] {
	return entries.filter(isRealUser);
}

export function getServiceAccounts(entries: PasswdEntry[]): PasswdEntry[] {
	return entries.filter((e) => !isRealUser(e));
}

export function isRealUser(entry: PasswdEntry, uidMin = 1000): boolean {
	if (entry.uid < uidMin) return false;
	if (entry.home.startsWith('/home/') === false) return false;

	const nologin = ['nologin', 'false'];
	if (nologin.some((s) => entry.shell.includes(s))) return false;

	return true;
}
