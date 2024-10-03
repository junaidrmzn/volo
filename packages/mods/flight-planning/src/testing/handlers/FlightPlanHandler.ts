import { rest } from "msw";
import { createFlightPlanMock } from "../../features/flight-plan-management/__mocks__/flightPlan";
import { mockedBaseUrl } from "../url";

export const getFlightPlanHandler = rest.get(
    `${mockedBaseUrl}/flight-plans/:resourceId`,
    async (request, response, context) => {
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
                data: createFlightPlanMock({ id: +request.params.resourceId, planStage: "accepted" }),
            })
        );
    }
);

export const getWebsocketNegotiateHandler = rest.get(
    `${mockedBaseUrl}/flight-plans/web-socket/negotiate`,
    async (request, response, context) => {
        return response(
            context.json({
                isError: false,
                pagination: {
                    total: null,
                    limit: null,
                    offset: null,
                },
                error: {},
                data: {
                    baseUrl: "http://localhost/",
                    token: "abcdefghijklmnopqrstuvwxyz",
                    url: "wss://localhost/",
                },
            })
        );
    }
);

export const getWebsocketJoinGroupHandler = rest.get(
    `${mockedBaseUrl}/flight-plans/web-socket/join-group`,
    async (request, response, context) => {
        return response(
            context.json({
                isError: false,
                pagination: {
                    total: null,
                    limit: null,
                    offset: null,
                },
                error: {},
                data: null,
            })
        );
    }
);
