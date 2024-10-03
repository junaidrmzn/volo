import { Box, Button, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useLocation } from "@voloiq/routing";
import { useFlightPlanningTranslation } from "../../../translations";
import { useRouteCreateDialog } from "../hooks";

type RouteCreateDialogProps = {
    routes: Route[];
    resetRouteTemplatePreview: () => void;
    handleCloseCreateDialog: () => void;
    toggleRouteTemplateList: () => void;
    handleRefocusCallback: (route?: Route) => void;
};
export const RouteCreateDialog = (props: RouteCreateDialogProps) => {
    const {
        routes,
        resetRouteTemplatePreview,
        handleCloseCreateDialog,
        toggleRouteTemplateList,
        handleRefocusCallback,
    } = props;
    const { t: translate } = useFlightPlanningTranslation();
    const location = useLocation();

    const { handleCreateNewRoute } = useRouteCreateDialog(
        routes,
        resetRouteTemplatePreview,
        handleCloseCreateDialog,
        handleRefocusCallback
    );

    return (
        <>
            <HStack justifyContent="space-between" minHeight="44px" p={3} flex="0 1 auto">
                <IconButton
                    onClick={handleCloseCreateDialog}
                    variant="ghost"
                    size="lg"
                    aria-label={translate("common.back")}
                    data-testid="route-create-dialog-back-button"
                    icon={<Icon icon="chevronLeft" />}
                />
                <Text data-testid="route-create-dialog-heading" size="small" fontWeight="bold">
                    {translate("routeCreateDialog.newRoute")}
                </Text>
                <Box width="24px" height="24px" />
            </HStack>
            <VStack flex="1 1 auto" overflowY="auto" p={3}>
                <Button width="100%" onClick={handleCreateNewRoute} variant="primary" data-testid="route-create-button">
                    {translate("routeCreateDialog.newRoute")}
                </Button>
                <RequirePermissions resources={["RouteTemplate"]} actions={["read"]}>
                    <Button
                        width="100%"
                        // don't toggle route template list if it's already visible
                        onClick={!location.pathname.endsWith("/templates") ? toggleRouteTemplateList : () => null}
                        variant="primary"
                        data-testid="route-create-from-template-button"
                    >
                        {translate("routeCreateDialog.fromTemplate")}
                    </Button>
                </RequirePermissions>
            </VStack>
        </>
    );
};
