import { getGroups, getRealUsers, getUserGroups, getUsers } from '$lib/server/creds';
import type { PasswdEntry, UserWithGroups } from '$lib/types/creds';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const users = getRealUsers(getUsers());
	const groupList = getGroups();

	const usersWithGroups: UserWithGroups[] = [];

	users.forEach((user: PasswdEntry) => {
		usersWithGroups.push({
			user,
			groups: getUserGroups(user.username, users, groupList)
		});
	});

	return {
		usersWithGroups
	};
}) satisfies PageServerLoad;
