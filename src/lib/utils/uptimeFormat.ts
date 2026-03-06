export function formatUptime(sec: number) {
	const units = [
		['d', 86400],
		['h', 3600],
		['m', 60],
		['s', 1]
	] as const;

	return units
		.map(([label, value]) => {
			const amount = Math.floor(sec / value);
			sec %= value;
			return amount ? `${amount}${label}` : '';
		})
		.filter(Boolean)
		.join(' ');
}
