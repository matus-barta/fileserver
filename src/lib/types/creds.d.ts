export type PasswdEntry = {
	username: string;
	password: string;
	uid: number;
	gid: number;
	gecos: string;
	home: string;
	shell: string;
};

export type UserWithGroups = {
	user: PasswdEntry;
	groups: UserGroup[];
};

export type GroupEntry = {
	groupname: string;
	password: string;
	gid: number;
	members: string[];
};

export type UserGroup = {
	name: string;
	gid: number;
};
