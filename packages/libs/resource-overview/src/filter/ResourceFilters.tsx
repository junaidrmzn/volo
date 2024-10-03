import { Center, Spinner } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { FiltersPanel } from "./FiltersPanel";

export const ResourceFilters = <Resource extends BaseResource>() => {
    const [state, send] = useGlobalState();
    const { matches } = state;

    return match(state)
        .when(
            () => matches("filter.loading"),
            () => (
                <Center boxSize="full">
                    <Spinner />
                </Center>
            )
        )
        .when(
            () => matches("filter.error"),
            () => <TechnicalError onTryAgainClick={() => send("RELOAD_FILTERS")} />
        )
        .otherwise(() => <FiltersPanel<Resource> />);
};
