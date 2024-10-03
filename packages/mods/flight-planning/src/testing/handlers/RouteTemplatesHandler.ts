import { rest } from "msw";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { anyRouteTemplate } from "../../features/__mocks__/routeTemplates";
import { mockedBaseUrl } from "../url";

export const getRouteTemplatesHandler = rest.get(
    `${mockedBaseUrl}/route-templates`,
    async (request, response, context) => {
        const withWaypoints = request.url.searchParams.get("withWaypoints");

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
                    anyRouteTemplate({
                        id: 2,
                        name: "Northpole",
                        plannedBy: "",
                        distance: 2,
                        createdAt: "2022-03-01",
                        validityDate: "2999-12-31",
                        waypoints: withWaypoints
                            ? [
                                  anyWaypoint({ id: 1, routeSequenceIndex: 0 }),
                                  anyWaypoint({ id: 2, routeSequenceIndex: 1 }),
                                  anyWaypoint({ id: 3, routeSequenceIndex: 2 }),
                              ]
                            : [],
                    }),
                    anyRouteTemplate({
                        id: 3,
                        name: "Australia",
                        plannedBy: "obiwan kenobi",
                        distance: 10,
                        createdAt: "2500-12-31",
                        validityDate: "2505-10-10",
                        waypoints: withWaypoints
                            ? [
                                  anyWaypoint({ id: 4, routeSequenceIndex: 0, name: "wp1" }),
                                  anyWaypoint({ id: 5, routeSequenceIndex: 1 }),
                              ]
                            : [],
                    }),
                    anyRouteTemplate({
                        id: 4,
                        name: "Mars",
                        plannedBy: "yoda",
                        distance: 354,
                        createdAt: "2222-12-22",
                        validityDate: "2223-01-01",
                        waypoints: withWaypoints
                            ? [
                                  anyWaypoint({ id: 6, routeSequenceIndex: 0, name: "wp0" }),
                                  anyWaypoint({ id: 7, routeSequenceIndex: 1 }),
                              ]
                            : [],
                    }),
                ],
            })
        );
    }
);
