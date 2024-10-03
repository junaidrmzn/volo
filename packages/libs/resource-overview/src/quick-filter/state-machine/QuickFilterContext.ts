import type { QuickFilter, QuickFilterProperty } from "./Types";

export type QuickFilterContext = {
    quickFilterProperties: QuickFilterProperty[];
    appliedQuickFilter?: QuickFilter;
};
