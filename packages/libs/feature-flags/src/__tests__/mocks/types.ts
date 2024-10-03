export type Feature = {
    id: number;
    name: string;
    created_date: string;
    description?: string;
    initial_value?: string;
    default_enabled: boolean;
    type: string;
};

export type FeatureFlagObject = {
    id: number;
    feature: Feature;
    feature_state_value: string | null;
    environment: number;
    identity: string | null;
    feature_segment: string | null;
    enabled: boolean;
};
