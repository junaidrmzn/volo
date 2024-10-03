import { Icon, IconButton, Td, Text, Tr } from "@volocopter/design-library-react";
import type { MouseEvent } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";
import { useDisplayedRoutes } from "../../displayed-routes";
import { useRefocusCallback } from "../../overview/hooks";
import { useSelectedRoute } from "../../selected-route";

type RouteListItemProps = {
    route: Route;
};
export const RouteListItem = (props: RouteListItemProps) => {
    const { route } = props;
    const { t: translate, i18n } = useFlightPlanningTranslation();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });
    const { displayRoute, undisplayRoute, displayedRoutes } = useDisplayedRoutes();
    const { selectRoute } = useSelectedRoute();
    const { handleRefocusCallback } = useRefocusCallback();

    const isDisplayed = displayedRoutes.map((displayedRoute) => displayedRoute.id).includes(route.id);

    return (
        <Tr
            width="100%"
            data-testid={`route-list-item-${route.id}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
                selectRoute(route.id);
                handleRefocusCallback(route);
            }}
        >
            <Td style={{ cursor: "pointer" }} p={0} paddingLeft={2} whiteSpace="pre-wrap">
                {route.name}
            </Td>
            <Td style={{ cursor: "pointer" }} p={0} whiteSpace="nowrap">
                <Text textAlign="right" fontSize="xs">
                    {route.createdAt ? dateFormatter.format(new Date(route.createdAt)) : ""}
                </Text>
            </Td>
            <Td p={0} data-testid={`toggle-displayed-route-${route.id}`} whiteSpace="nowrap">
                {isDisplayed ? (
                    <IconButton
                        variant="ghost"
                        aria-label={translate("routeList.unselect route")}
                        onClick={(event: MouseEvent) => {
                            event.stopPropagation();
                            undisplayRoute(route);
                        }}
                    >
                        <Icon icon="eye" />
                    </IconButton>
                ) : (
                    <IconButton
                        variant="ghost"
                        aria-label={translate("routeList.select route")}
                        onClick={(event: MouseEvent) => {
                            event.stopPropagation();
                            displayRoute(route);
                        }}
                    >
                        <Icon icon="eyeStrikeThrough" />
                    </IconButton>
                )}
            </Td>
        </Tr>
    );
};
