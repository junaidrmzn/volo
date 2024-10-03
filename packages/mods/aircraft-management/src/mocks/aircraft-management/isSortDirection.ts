import type { SortDirection } from "@mswjs/data/lib/query/queryTypes";

export const isSortDirection = (direction: unknown): direction is SortDirection =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ["asc", "desc"].includes((direction as SortDirection).toLowerCase());
