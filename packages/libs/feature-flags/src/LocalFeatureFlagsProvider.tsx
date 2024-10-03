import { FlagsmithContext } from "flagsmith/react";
import type { ReactNode } from "react";
import type { FeatureFlagsConfiguration } from "./featureFlags";

export type LocalFeatureFlagsProviderProps = {
    children: ReactNode;
    configurationOverride?: FeatureFlagsConfiguration;
};

const defaultLocalFeatureFlagConfiguration = {
    "resource-overview-new-filter": { enabled: false },
    "iq-777-resource-management": { enabled: false },
};

export const LocalFeatureFlagsProvider = (props: LocalFeatureFlagsProviderProps) => {
    const { configurationOverride = {}, children } = props;

    const configuration: FeatureFlagsConfiguration = {
        ...defaultLocalFeatureFlagConfiguration,
        ...configurationOverride,
    };

    return (
        <FlagsmithContext.Provider
            value={{
                cacheOptions: {
                    skipAPI: true,
                    ttl: 0,
                },
                init: () => Promise.resolve(),
                getFlags: () => Promise.resolve(),
                // @ts-ignore
                getAllFlags: () => {},
                identify: () => Promise.resolve(),
                getState: () => ({
                    api: "localhost",
                    environmentID: "mock",
                    traits: {},
                    flags: {},
                }),
                log: () => {},
                logout: () => Promise.resolve(),
                startListening: () => {},
                stopListening: () => {},
                hasFeature: (key: string) => (configuration[key] !== undefined ? configuration[key]!.enabled : true),
                // @ts-ignore
                getValue: () => null,
                getTrait: () => false,
                setTrait: () => Promise.resolve(),
                setTraits: () => Promise.resolve(),
                setState: () => {},
            }}
        >
            {children}
        </FlagsmithContext.Provider>
    );
};
