import { Box, HStack, Text } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { useGlobalState } from "../global-state/useGlobalState";

export type RenderActionsHandlerOptions = { reloadList: () => void };
export type RenderActionsHandler = (options: RenderActionsHandlerOptions) => ReactNode;
export type ResourceActionBarProps = {
    renderActions?: RenderActionsHandler;
};
export const ResourceActionBar = (props: ResourceActionBarProps) => {
    const { renderActions } = props;

    const [state, send] = useGlobalState();

    const {
        context: { getResourceInfo },
    } = state;

    const reloadList = () => {
        send({ type: "RELOAD_LIST" });
    };

    return (
        <HStack boxSize="full" justify="space-between" mb={4}>
            <Box flex={2}>
                <Text size="xxs">{getResourceInfo()}</Text>
            </Box>
            <HStack boxSize="full" flex={1} justify="end">
                {renderActions?.({ reloadList })}
            </HStack>
        </HStack>
    );
};
