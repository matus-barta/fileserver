import type { GroupEntry, PasswdEntry, UserGroup } from '$lib/types/creds';

const ADMIN_GROUPS = ['sudo', 'wheel', 'admin', 'root'];

export function detectAdminGroups(userGroups: UserGroup[]): UserGroup[] {
	const admin = userGroups.find((g) => ADMIN_GROUPS.includes(g.name));
	return admin ? [admin] : [];
}

export function primaryGroup(user: PasswdEntry, groups: UserGroup[]): UserGroup[] {
	const group = groups.find((g) => g.gid === user.gid);
	return group ? [group] : [];
}

export function isAdminGroup(group: GroupEntry): boolean {
	return ADMIN_GROUPS.includes(group.groupname);
}
