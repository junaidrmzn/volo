import { useEffectOnce } from "react-use";
import { useInitialFilterSet } from "./filter-bar/local-storage/useInitialFilterSet";
import { useGlobalState } from "./global-state/useGlobalState";
import { usePaginationParameters } from "./list/usePaginationParameters";
import { getInitialSortingConfiguration } from "./sort/getInitialSortingConfiguration";

export const useInitializeContext = (withOldFilter = true) => {
    const [state, send] = useGlobalState();
    const {
        meta: {
            resourceOverview: { getResourceName },
        },
        context: { filters, filterProperties = [], sortingConfig, sortingOptions },
    } = state;

    const { page } = usePaginationParameters(getResourceName());

    const { filters: appliedFilterSet, sortingConfiguration: initialSortingConfigurationNew } = useInitialFilterSet(
        getResourceName(),
        filterProperties,
        filters,
        withOldFilter,
        sortingConfig
    );

    const sortingConfiguration = sortingConfig
        ? initialSortingConfigurationNew
        : getInitialSortingConfiguration(sortingOptions);

    useEffectOnce(() => {
        send({ type: "SET_CONTEXT", page, appliedFilterSet, sortingConfiguration });
    });
};
