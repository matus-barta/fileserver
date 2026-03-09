import { query } from '$app/server';
import { promises as fs } from 'fs';
import pathModule from 'path';
import z from 'zod';
import type { Node } from '$lib/types/fs';
import { getFolderSizeRecursive } from '$lib/server/system';

const ListSchema = z.object({
	path: z.string(),
	folderSize: z.boolean().optional().default(false)
});

export const list = query(ListSchema, async ({ path, folderSize }): Promise<Node[]> => {
	try {
		const entries = await fs.readdir(path, { withFileTypes: true });

		const nodes = await Promise.all(
			entries.map(async (entry): Promise<Node> => {
				const fullPath = pathModule.join(path, entry.name);

				try {
					const stat = await fs.stat(fullPath);
					if (entry.isDirectory()) {
						return {
							type: 'folder',
							name: entry.name,
							size: folderSize ? await getFolderSizeRecursive(fullPath) : 0,
							modified: stat.mtime,
							created: stat.ctime
						};
					}

					if (entry.isFile()) {
						return {
							type: 'file',
							name: entry.name,
							size: stat.size,
							modified: stat.mtime,
							created: stat.ctime
						};
					}

					if (entry.isSymbolicLink()) {
						return {
							type: 'symlink',
							name: entry.name,
							size: 0,
							modified: stat.mtime,
							created: stat.ctime
						};
					}
					return {
						type: null,
						name: entry.name,
						size: 0,
						modified: null,
						created: null
					};
				} catch {
					return {
						type: null,
						name: entry.name,
						size: 0,
						modified: null,
						created: null
					};
				}
			})
		);
		return nodes;
	} catch {
		return [];
	}
});
