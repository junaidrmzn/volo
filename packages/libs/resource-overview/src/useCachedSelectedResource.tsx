import { useEffect, useState } from "react";
import { useGlobalState } from "./global-state/useGlobalState";
import type { BaseResource } from "./state-machine/BaseResource";

export const useCachedSelectedResource = <Resource extends BaseResource>() => {
    const [state] = useGlobalState();
    const {
        matches,
        context: { selectedResource },
    } = state;
    const [cachedSelectedResource, setCachedSelectedResource] = useState<Resource | undefined>(undefined);

    useEffect(() => {
        if (matches({ preview: "loading" })) {
            setCachedSelectedResource(undefined);
        } else if (selectedResource) {
            setCachedSelectedResource(selectedResource);
        }
    }, [selectedResource, matches]);

    return { cachedSelectedResource };
};
