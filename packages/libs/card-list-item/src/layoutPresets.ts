import type { ReturnProps } from "./useGridPropsQuery";

export type LayoutPresets = "original" | "wideAdditionalContent";

export const layoutPresets: Record<string, ReturnProps["gridProps"]["templateColumns"]> = {
    original: "1fr 50% 1fr",
    wideAdditionalContent: "20% 70% 10%",
};
