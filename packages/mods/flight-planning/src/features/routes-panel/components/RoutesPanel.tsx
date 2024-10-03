import { Flex, useColorModeValue } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { Route } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType } from "@voloiq/map";
import { RouteCreateDialog } from "../../route-create-dialog";
import { RouteDetails } from "../../route-details";
import { RouteList } from "../../routes-list";
import { useSelectedRoute } from "../../selected-route";
import { useRoutesPanel } from "../hooks";

type RoutesPanelProps = {
    routes: Route[];
    resetRouteTemplatePreview: () => void;
    toggleRouteTemplateList: () => void;
    handleRefocusCallback: (route?: Route) => void;
    voloiqMapStore?: VoloiqMapStoreType;
};
export const RoutesPanel = (props: RoutesPanelProps) => {
    const { routes, resetRouteTemplatePreview, toggleRouteTemplateList, handleRefocusCallback, voloiqMapStore } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    const { selectedRoute } = useSelectedRoute();
    const { isRouteCreation, setIsRouteCreation } = useRoutesPanel();

    return (
        <RequirePermissions resources={["Route"]} actions={["read"]}>
            <Flex
                pointerEvents="auto"
                w="100%"
                flexDirection="column"
                bgColor={bgColor}
                alignItems="normal"
                boxShadow="lg"
                borderRadius="lg"
                data-testid="route-list-panel"
                overflow="hidden"
            >
                {isRouteCreation && !selectedRoute ? (
                    <RouteCreateDialog
                        routes={routes || []}
                        resetRouteTemplatePreview={resetRouteTemplatePreview}
                        handleCloseCreateDialog={() => setIsRouteCreation(false)}
                        toggleRouteTemplateList={toggleRouteTemplateList}
                        handleRefocusCallback={handleRefocusCallback}
                    />
                ) : selectedRoute ? (
                    <RouteDetails route={selectedRoute} voloiqMapStore={voloiqMapStore} />
                ) : (
                    <RouteList handleCreateNewRoute={() => setIsRouteCreation(true)} routes={routes || []} />
                )}
            </Flex>
        </RequirePermissions>
    );
};
