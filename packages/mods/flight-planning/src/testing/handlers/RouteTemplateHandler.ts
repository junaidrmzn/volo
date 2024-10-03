import { rest } from "msw";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { anyRouteTemplate } from "../../features/__mocks__/routeTemplates";
import { mockedBaseUrl } from "../url";

export const getRouteTemplateHandler = rest.get(
    `${mockedBaseUrl}/route-templates/:resourceId`,
    async (request, response, context) => {
        const withWaypoints = request.url.searchParams.get("withWaypoints");
        if (
            !request.params.flightId ||
            Number.isNaN(+request.params.flightId) ||
            !request.params.resourceId ||
            Number.isNaN(+request.params.resourceId)
        ) {
            return response(context.status(404));
        }

        return response(
            context.json({
                isError: false,
                pagination: {
                    total: null,
                    limit: null,
                    offset: null,
                },
                error: {},
                data: anyRouteTemplate({
                    id: +request.params.resourceId,
                    name: `route${request.params.resourceId}`,
                    waypoints: withWaypoints
                        ? [
                              anyWaypoint({ id: 1, name: "wp1", routeSequenceIndex: 0 }),
                              anyWaypoint({ id: 2, name: "wp2", routeSequenceIndex: 1 }),
                          ]
                        : [],
                }),
            })
        );
    }
);
