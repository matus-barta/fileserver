export interface PasswdEntry {
  username: string;
  password: string;
  uid: number;
  gid: number;
  gecos: string;
  home: string;
  shell: string;
}

export interface ParseResult {
  entries: PasswdEntry[];
  skipped: string[];
}

export function parsePasswd(content: string): ParseResult {
  const entries: PasswdEntry[] = [];
  const skipped: string[] = [];

  const lines = content.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const parts = line.split(":");

    if (parts.length !== 7) {
      skipped.push(line);
      continue;
    }

    const [username, password, uidStr, gidStr, gecos, home, shell] = parts;

    const uid = Number(uidStr);
    const gid = Number(gidStr);

    if (Number.isNaN(uid) || Number.isNaN(gid)) {
      skipped.push(line);
      continue;
    }

    entries.push({
      username,
      password,
      uid,
      gid,
      gecos,
      home,
      shell,
    });
  }

  return { entries, skipped };
}