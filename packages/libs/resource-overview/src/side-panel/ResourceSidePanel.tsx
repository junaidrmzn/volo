import { Box, Skeleton } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { useGlobalState } from "../global-state/useGlobalState";

export type RenderSidePanelHandlerOptions = { reloadList: () => void; resourceId: string };
export type RenderSidePanelHandler = (options: RenderSidePanelHandlerOptions) => ReactNode;
export type ResourceSidePanelProps = {
    renderSidePanel?: RenderSidePanelHandler;
};
export const ResourceSidePanel = (props: ResourceSidePanelProps) => {
    const { renderSidePanel } = props;

    const [state, send] = useGlobalState();
    const {
        context: { selectedResourceId },
    } = state;

    const reloadList = () => {
        send({ type: "RELOAD_LIST" });
    };

    if (!renderSidePanel) {
        throw new Error("Please provide a render function for the SidePanel");
    }

    return state.matches("list.loading") || state.matches("list.initialLoading") ? (
        <Skeleton width="full" height="full" startColor="darkBlue.100" endColor="darkBlue.200" isLoading />
    ) : (
        <Box width="full" backgroundColor="bgNavigationLayer1" padding="3" borderRadius="md" alignItems="flex-start">
            {renderSidePanel({ resourceId: selectedResourceId, reloadList })}
        </Box>
    );
};
