import type { Waypoint } from "@voloiq-typescript-api/flight-planning-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import type { ResponseEnvelope } from "@voloiq/service";
import { mockedBaseUrl } from "../url";

const responseEnvelope: ResponseEnvelope<Waypoint> = {
    pagination: {
        total: 1,
        limit: 1,
        offset: 0,
    },
    error: undefined,
    data: undefined,
};

export const putWaypointOnRouteHandler = rest.put<Waypoint, PathParams, ResponseEnvelope<Waypoint>>(
    `${mockedBaseUrl}/routes/:routeId/waypoints/:resourceId`,
    (request, response, context) => {
        const { body, params } = request;
        const { flightId, resourceId } = params;

        if (!flightId || Number.isNaN(+flightId) || !resourceId || Number.isNaN(+resourceId)) {
            return response(context.status(404));
        }

        return response(
            context.json({
                ...responseEnvelope,
                data: {
                    ...body,
                    id: +resourceId + 1,
                },
            })
        );
    }
);

export const deleteWaypointOnRouteHandler = rest.delete(
    `${mockedBaseUrl}/routes/:routeId/waypoints/:resourceId`,
    async (request, response, context) => {
        const { params } = request;
        const { flightId, resourceId } = params;

        if (!flightId || Number.isNaN(+flightId) || !resourceId || Number.isNaN(+resourceId)) {
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
                data: [anyWaypoint()],
            })
        );
    }
);
