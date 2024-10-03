import { Center, Spinner } from "@volocopter/design-library-react";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import { useAuthentication } from "@voloiq/auth";
import { isDevelopment } from "@voloiq/utils/src";
import { useFeatureFlagsProvider } from "./useFeatureFlagsProvider";

export type FeatureFlagSettings = {
    baseUrl: string;
    environmentId: string;
};

export const FeatureFlagsProvider: FCC<FeatureFlagSettings> = (props) => {
    const { baseUrl, environmentId, children } = props;
    const { isLoaded, handleChange, handleError } = useFeatureFlagsProvider();
    const { email } = useAuthentication();

    const fallbackFeatureFlags = "$FALLBACK_FEATURE_FLAGS_CONFIGURATION";
    return (
        <FlagsmithProvider
            options={{
                api: `${baseUrl}/api/v1/`,
                environmentID: environmentId,
                identity: email,
                onChange: handleChange,
                onError: handleError,
                cacheFlags: true,
                defaultFlags: isDevelopment && fallbackFeatureFlags ? JSON.parse(fallbackFeatureFlags) : undefined,
            }}
            flagsmith={flagsmith}
        >
            {isLoaded ? (
                <>{children}</>
            ) : (
                <Center height="full">
                    <Spinner />
                </Center>
            )}
        </FlagsmithProvider>
    );
};
