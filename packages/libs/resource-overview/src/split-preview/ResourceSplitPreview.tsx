import { Box, Skeleton } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";

export type RenderSplitPreviewOptions = {
    reloadList: () => void;
};

export type ResourceSplitPreviewProps<Resource> = {
    renderSplitPreview: (resource: Resource, options: RenderSplitPreviewOptions) => ReactNode;
};

export const ResourceSplitPreview = <Resource extends BaseResource>(props: ResourceSplitPreviewProps<Resource>) => {
    const { renderSplitPreview } = props;
    const [state, send] = useGlobalState();
    const {
        context: { selectedResource, selectedResourceId },
        matches,
    } = state;

    if (!renderSplitPreview) {
        throw new Error("Please provide a render function for the SplitPreview");
    }

    return match(state)
        .when(
            () =>
                matches("split_preview.loading") ||
                state.matches("list.loading") ||
                state.matches("list.initialLoading"),
            () => <Skeleton width="full" height="full" startColor="darkBlue.100" endColor="darkBlue.200" isLoading />
        )
        .when(
            () => matches("split_preview.error"),
            () => <TechnicalError onTryAgainClick={() => send({ type: "RELOAD_SPLIT_PREVIEW", selectedResourceId })} />
        )
        .otherwise(() => (
            <Box
                width="full"
                backgroundColor="bgNavigationLayer1"
                padding="3"
                borderRadius="md"
                alignItems="flex-start"
            >
                {renderSplitPreview(selectedResource, { reloadList: () => send({ type: "RELOAD_LIST" }) })}
            </Box>
        ));
};
