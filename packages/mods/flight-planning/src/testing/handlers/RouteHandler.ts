import { rest } from "msw";
import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../url";

export const getRouteHandler = rest.get(
    `${mockedBaseUrl}/route-options/:routeOptionId/route/:resourceId`,
    async (request, response, context) => {
        const withWaypoints = request.url.searchParams.get("withWaypoints");
        if (
            !request.params.routeOptionId ||
            Number.isNaN(+request.params.routeOptionId) ||
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
                data: anyRoute({
                    id: +request.params.routeOptionId,
                    name: `route${request.params.routeOptionId}`,
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

export const createRouteHandler = rest.post(
    `${mockedBaseUrl}/route-options/:routeOptionId/routes`,
    async (_request, response, context) => {
        return response(
            context.json({
                isError: false,
                pagination: {
                    total: null,
                    limit: null,
                    offset: null,
                },
                error: {},
                data: anyRoute(),
            })
        );
    }
);
