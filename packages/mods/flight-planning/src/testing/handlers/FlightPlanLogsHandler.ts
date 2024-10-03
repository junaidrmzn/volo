import { rest } from "msw";
import { createFlightPlanLogMock } from "../../features/flight-plan-management/__mocks__/flightPlanLogs";
import { mockedBaseUrl } from "../url";

export const getFlightPlanLogsHandler = rest.get(
    `${mockedBaseUrl}/flight-plans/:resourceId/flight-plan-log`,
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
                data: [
                    createFlightPlanLogMock({
                        action: "create",
                        message: "flight plan created",
                        timestamp: new Date(Date.UTC(2022, 1, 1, 0, 0, 10)).toString(),
                    }),
                    createFlightPlanLogMock({
                        action: "accept",
                        message: "flight plan accepted",
                        timestamp: new Date(Date.UTC(2022, 1, 1, 0, 1, 20)).toString(),
                    }),
                    createFlightPlanLogMock({
                        action: "update",
                        message: "flight plan updated",
                        timestamp: new Date(Date.UTC(2022, 1, 1, 0, 2, 30)).toString(),
                    }),
                    createFlightPlanLogMock({
                        action: "conflict",
                        message: "flight plan conflicted",
                        timestamp: new Date(Date.UTC(2022, 1, 1, 0, 2, 40)).toString(),
                    }),
                ],
            })
        );
    }
);
