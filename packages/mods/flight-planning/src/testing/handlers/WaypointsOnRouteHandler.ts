import { rest } from "msw";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../url";

export const getWaypointsOnRouteHandler = rest.get(
    `${mockedBaseUrl}/routes/:routeId/waypoints`,
    async (request, response, context) => {
        const { params } = request;
        const { routeId } = params;

        if (!routeId || Number.isNaN(+routeId)) {
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
                data: [anyWaypoint({ id: 1, name: "wp1" }), anyWaypoint({ id: 2, name: "wp2", routeSequenceIndex: 1 })],
            })
        );
    }
);
