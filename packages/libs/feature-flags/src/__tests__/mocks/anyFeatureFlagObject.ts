import type { Feature, FeatureFlagObject } from "./types";

export const anyFeature = (overrides?: Partial<Feature>): Feature => {
    return {
        id: 10,
        name: "logbook",
        created_date: "2022-09-15T15:06:54.678988Z",
        description: "Turns on the logbook module",
        default_enabled: false,
        type: "STANDARD",
        ...overrides,
    };
};

export const anyFeatureFlagObject = (overrides?: Partial<FeatureFlagObject>): FeatureFlagObject => {
    return {
        id: 1,
        feature: anyFeature(),
        feature_state_value: null,
        environment: 1,
        identity: null,
        feature_segment: null,
        enabled: true,
        ...overrides,
    };
};
