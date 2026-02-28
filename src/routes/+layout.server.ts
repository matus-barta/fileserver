import { hostname } from '$lib/server/system';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		hostname: hostname()
	};
};
