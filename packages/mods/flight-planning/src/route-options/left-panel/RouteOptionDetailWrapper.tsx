import { Box, HStack, Icon, IconButton, Text } from "@volocopter/design-library-react";
import { useRefocusCallback } from "../../features/overview/hooks/useRefocusCallback";
import { useSelectedRoute } from "../../features/selected-route";
import { RouteCardNew } from "./route-option-meta/RouteCardNew";
import { useRoutesTranslation } from "./routes/translations";

type RouteOptionDetailWrapperProps = {
    onClose: () => void;
    isOpen: boolean;
};

export const RouteOptionDetailWrapper = (props: RouteOptionDetailWrapperProps) => {
    const { isOpen, onClose } = props;
    const { selectedRoute, unselectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();
    const { t } = useRoutesTranslation();
    const toggleWidth = isOpen ? "348px" : "0px";

    return (
        <Box
            pos="absolute"
            top="12vh"
            backgroundColor="bgNavigationLayer1"
            size="s"
            w={toggleWidth}
            h="calc(100vh - 96px)"
            transition="all 0.3s ease"
            overflow="hidden"
            gap={10}
        >
            <HStack>
                <IconButton
                    aria-label={t("header.left")}
                    onClick={() => {
                        onClose();
                        unselectRoute();
                        handleRefocusCallback(selectedRoute);
                    }}
                    variant="ghost"
                    size="lg"
                    icon={<Icon icon="chevronLeft" />}
                />
                <Text fontSize={12}> {t("header.backToRoutesOverview")}</Text>
            </HStack>
            <RouteCardNew key={selectedRoute?.id} route={selectedRoute} />
        </Box>
    );
};
