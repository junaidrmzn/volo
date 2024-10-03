import type { IFlagsmithFeature } from "flagsmith/types";

export type FeatureFlagsConfiguration = Record<string, Omit<IFlagsmithFeature, "id">>;
