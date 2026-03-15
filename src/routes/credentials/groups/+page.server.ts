import { getGroups } from '$lib/server/creds';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		groups: getGroups()
	};
}) satisfies PageServerLoad;
