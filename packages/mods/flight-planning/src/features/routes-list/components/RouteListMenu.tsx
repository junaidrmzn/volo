import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { useGetRouteOptionCsv, useGetRouteOptionExcel, useGetRouteOptionKml } from "../../../api-hooks";
import { useFlightPlanningTranslation } from "../../../translations";
import { useSelectedRoute } from "../../selected-route";
import { UploadKmlFileMenuItem } from "./upload-kml-file/UploadKmlFileMenuItem";

export const RouteListMenu = () => {
    const { t: translate } = useFlightPlanningTranslation();
    const isAuthRouteUpdate = useIsAuthorizedTo(["update"], ["Route"]);
    const isAuthRouteDelete = useIsAuthorizedTo(["delete"], ["Route"]);
    const isAuthRouteTemplateCreate = useIsAuthorizedTo(["create"], ["RouteTemplate"]);
    const { routeOptionId } = useSelectedRoute();
    const { data: routeOption } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { getRouteOptionCsv } = useGetRouteOptionCsv();
    const { getRouteOptionExcel } = useGetRouteOptionExcel();
    const { getRouteOptionKml } = useGetRouteOptionKml();

    const handleExportRouteOptionCsv = () => {
        if (!routeOption) return;
        getRouteOptionCsv(routeOption);
    };
    const handleExportRouteOptionExcel = () => {
        if (!routeOption) return;
        getRouteOptionExcel(routeOption);
    };
    const handleExportRouteOptionKml = () => {
        if (!routeOption) return;
        getRouteOptionKml(routeOption);
    };

    return (
        <Menu placement="right-start">
            <MenuButton
                as={IconButton}
                size="lg"
                aria-label={translate("routeDetails.menu.open")}
                icon={<Icon icon="ellipsisVertical" />}
                variant="ghost"
                data-testid="route-details-menu-button"
            />

            <Portal>
                <MenuList>
                    {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                        <MenuItem
                            icon={<Icon icon="download" />}
                            onClick={handleExportRouteOptionKml}
                            data-testid="menu-export-route-option-kml-button"
                        >
                            {translate("routeList.menu.exportRouteOptionKml")}
                        </MenuItem>
                    )}
                    {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                        <MenuItem
                            icon={<Icon icon="download" />}
                            onClick={handleExportRouteOptionCsv}
                            data-testid="menu-export-route-option-csv-button"
                        >
                            {translate("routeList.menu.exportRouteOptionCsv")}
                        </MenuItem>
                    )}
                    {(isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                        <MenuItem
                            icon={<Icon icon="download" />}
                            onClick={handleExportRouteOptionExcel}
                            data-testid="menu-export-route-option-excel-button"
                        >
                            {translate("routeList.menu.exportRouteOptionExcel")}
                        </MenuItem>
                    )}
                    {routeOptionId && (isAuthRouteUpdate || isAuthRouteDelete || isAuthRouteTemplateCreate) && (
                        <UploadKmlFileMenuItem routeOptionId={routeOptionId} />
                    )}
                </MenuList>
            </Portal>
        </Menu>
    );
};
