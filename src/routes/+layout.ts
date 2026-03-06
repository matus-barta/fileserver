import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch, data }) => {
	const ghUrl = 'https://api.github.com/repos/matus-barta/fileserver';
	interface ghApi {
		watchers: number;
	}

	const watchers = (
		await fetch(ghUrl)
			.catch((e) => {
				console.error(e);
				return e.message; //FIXME: handle fetch error
			})
			.then((res) => res.json() as Promise<ghApi>)
	).watchers;

	return {
		ghStars: watchers,
		system: data
	};
};
