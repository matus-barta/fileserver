export type Node = {
	type: 'file' | 'folder' | 'symlink' | null;
	name: string;
	size: number;
	modified: Date | null;
	created: Date | null;
};
