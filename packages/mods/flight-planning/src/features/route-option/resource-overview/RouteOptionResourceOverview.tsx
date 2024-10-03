import { Icon } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { ResourceOverview } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import { useFlightPlanningTranslation } from "../../../translations";
import { RouteOptionAdd } from "./add";
import { RouteOptionsListItem } from "./list-item";
import { RouteOptionPreview } from "./preview";
import type { RouteOptionResource } from "./types";
import { useRouteOptionResourceOverview } from "./useRouteOptionResourceOverview";

export const RouteOptionResourceOverview = () => {
    const { t } = useFlightPlanningTranslation();
    const { routeOptionResourceMachineConfig, handleOpenRouteOptionOverview } = useRouteOptionResourceOverview();
    const navigate = useNavigate();
    return (
        <ResourceOverview<RouteOptionResource> machineConfig={routeOptionResourceMachineConfig}>
            <ResourceOverview.ListItem>
                {(routeOption: RouteOptionResource, cardListItemProps: CardListItemProps) => (
                    <RouteOptionsListItem
                        routeOption={routeOption}
                        key={routeOption.id}
                        handleToggleRouteOption={() => null}
                        cardListItemProps={cardListItemProps}
                    />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(routeOption: RouteOptionResource) => <RouteOptionPreview routeOption={routeOption} />}
            </ResourceOverview.Preview>
            <ResourceOverview.PreviewActionButtons>
                {(routeOption: RouteOptionResource) => (
                    <>
                        <ResourceOverview.PreviewActionButton
                            variant="ghost"
                            icon={<Icon icon="chevronRight" />}
                            onClick={() => navigate(`${routeOption.id}/plan`)}
                        >
                            {t("routeOption.routeOptionDetails.fileFlightPlan")}
                        </ResourceOverview.PreviewActionButton>
                        <ResourceOverview.PreviewActionButton
                            variant="ghost"
                            data-testid="flight-details-edit-button"
                            onClick={() => {
                                handleOpenRouteOptionOverview(routeOption);
                            }}
                            icon={<Icon icon="chevronRight" />}
                        >
                            {t("routeOption.routeOptionDetails.openRouteOption")}
                        </ResourceOverview.PreviewActionButton>
                    </>
                )}
            </ResourceOverview.PreviewActionButtons>
            <ResourceOverview.Add>{RouteOptionAdd}</ResourceOverview.Add>
        </ResourceOverview>
    );
};
