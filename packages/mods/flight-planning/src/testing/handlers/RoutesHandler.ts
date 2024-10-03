import { rest } from "msw";
import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../url";

export const getRoutesHandler = rest.get(
    `${mockedBaseUrl}/route-options/:resourceId/routes`,
    async (request, response, context) => {
        const withWaypoints = request.url.searchParams.get("withWaypoints");
        if (!request.params.resourceId || Number.isNaN(+request.params.resourceId)) {
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
                data: [
                    anyRoute({
                        id: 40,
                        name: "route40",
                        waypoints: withWaypoints
                            ? [
                                  anyWaypoint({ id: 1, routeSequenceIndex: 0 }),
                                  anyWaypoint({ id: 2, routeSequenceIndex: 1 }),
                                  anyWaypoint({ id: 3, routeSequenceIndex: 2 }),
                              ]
                            : [],
                    }),
                    anyRoute({
                        id: 43,
                        name: "route43",
                        waypoints: withWaypoints
                            ? [
                                  anyWaypoint({ id: 4, routeSequenceIndex: 0, name: "wp1" }),
                                  anyWaypoint({ id: 5, routeSequenceIndex: 1 }),
                              ]
                            : [],
                    }),
                ],
            })
        );
    }
);
