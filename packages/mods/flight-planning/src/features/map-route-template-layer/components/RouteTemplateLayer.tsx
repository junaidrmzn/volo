import { RouteTemplate, useGetRouteTemplate } from "@voloiq/flight-planning-api/v1";
import { colors } from "../../../utils";
import { useRouteTemplateLayer } from "../hooks/useRouteTemplateLayer";
import { NonDraggableWaypointMarker } from "./NonDraggableWaypointMarker";

type RouteTemplateLayerProps = {
    routeTemplate: RouteTemplate;
};

export const RouteTemplateLayer = (props: RouteTemplateLayerProps) => {
    const { routeTemplate } = props;
    const routeTemplateQuery = useGetRouteTemplate(routeTemplate.id, true);
    useRouteTemplateLayer(routeTemplateQuery.data);
    return (
        <>
            {routeTemplateQuery.data?.waypoints?.map((waypointTemplate) => (
                <NonDraggableWaypointMarker
                    waypoint={waypointTemplate}
                    key={waypointTemplate.id}
                    color={colors.blue[300]}
                />
            ))}
        </>
    );
};
