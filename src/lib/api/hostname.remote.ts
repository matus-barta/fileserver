import { query } from '$app/server';
import os from 'os';

export const hostname = query(() => {
	return os.hostname();
});
