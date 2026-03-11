import type { PasswdEntry, UserGroup } from '$lib/types/creds';

export function detectAdminGroup(userGroups: UserGroup[]): UserGroup[] {
	const ADMIN_GROUPS = ['sudo', 'wheel', 'admin'];
	const admin = userGroups.find((g) => ADMIN_GROUPS.includes(g.name));
	return admin ? [admin] : [];
}

export function primaryGroup(user: PasswdEntry, groups: UserGroup[]): UserGroup[] {
	const group = groups.find((g) => g.gid === user.gid);
	return group ? [group] : [];
}
