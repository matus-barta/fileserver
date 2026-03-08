/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/table-core';

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData, TValue> {
		class?: string;
	}
}
