export interface OsRelease {
	[key: string]: string;
}

/**
 * Parse the contents of /etc/os-release into a key-value object.
 */
export function parseOsRelease(content: string): OsRelease {
	const result: OsRelease = {};

	const lines = content.split(/\r?\n/);

	for (const rawLine of lines) {
		const line = rawLine.trim();

		// Skip empty lines and comments
		if (!line || line.startsWith('#')) continue;

		const eqIndex = line.indexOf('=');
		if (eqIndex === -1) continue;

		const key = line.slice(0, eqIndex).trim();
		let value = line.slice(eqIndex + 1).trim();

		// Remove surrounding quotes if present
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		// Unescape common escaped characters
		value = value
			.replace(/\\n/g, '\n')
			.replace(/\\t/g, '\t')
			.replace(/\\"/g, '"')
			.replace(/\\\\/g, '\\');

		result[key] = value;
	}

	return result;
}
