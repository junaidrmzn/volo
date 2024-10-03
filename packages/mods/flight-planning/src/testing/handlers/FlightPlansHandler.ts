import { rest } from "msw";
import { createFlightPlanMock } from "../../features/flight-plan-management/__mocks__/flightPlan";
import { mockedBaseUrl } from "../url";

export const getFlightPlansHandler = rest.get(`${mockedBaseUrl}/flight-plans`, async (_request, response, context) => {
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
                createFlightPlanMock({ id: 1, planStage: "accepted" }),
                createFlightPlanMock({ id: 2, planStage: "rejected" }),
                createFlightPlanMock({ id: 3, planStage: "completed" }),
                createFlightPlanMock({ id: 4, planStage: "activated" }),
                createFlightPlanMock({ id: 5, planStage: "activated", conflictStatus: "conflicting" }),
            ],
        })
    );
});

export const createFlightPlanHandler = rest.post(
    `${mockedBaseUrl}/route-options/:routeOptionId/flight-plans`,
    async (_request, response, context) => {
        return response(context.status(201));
    }
);
