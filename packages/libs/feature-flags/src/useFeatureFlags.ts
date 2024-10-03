import { useFlagsmith } from "flagsmith/react";

export const useFeatureFlags = () => {
    const flagsmith = useFlagsmith();

    const isFeatureFlagEnabled = (featureFlag: string) => flagsmith.hasFeature(featureFlag);

    return {
        isFeatureFlagEnabled,
    };
};
