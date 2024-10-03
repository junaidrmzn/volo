import { rest } from "msw";
import { FLIGHT_PLANNING } from "../../api-hooks/serviceEndpoints";
import { createMockedAircraft } from "../../features/file-flight-plan/__mocks__/aircraft";

export const getAllExternalAircraftHandler = rest.get(
    `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/external/aircraft`,
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
                data: [
                    createMockedAircraft({ externalId: "aircraft-1", registration: "aircraft-1" }),
                    createMockedAircraft({ externalId: "aircraft-2", registration: "aircraft-2" }),
                ],
            })
        );
    }
);
