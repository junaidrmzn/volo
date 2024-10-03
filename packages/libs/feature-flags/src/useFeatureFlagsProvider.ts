import { useState } from "react";

export const useFeatureFlagsProvider = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChange = () => {
        // TODO: handle feature flag override or at least document the new way to do it with Flagsmith
        setIsLoaded(true);
    };

    const handleError = () => {
        // In this case cached or default feature flags will be used
        // https://docs.flagsmith.com/guides-and-examples/defensive-coding#dont-block-your-application-waiting-on-our-response
        setIsLoaded(true);
    };

    return {
        isLoaded,
        handleChange,
        handleError,
    };
};
