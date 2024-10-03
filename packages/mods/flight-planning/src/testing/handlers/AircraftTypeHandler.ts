import { rest } from "msw";
import { FLIGHT_PLANNING } from "../../api-hooks/serviceEndpoints";
import { createMockedAircraftType } from "../../features/file-flight-plan/__mocks__/aircraftType";

export const getExternalAircraftTypeHandler = rest.get(
    `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/external/aircraft-types/:id`,
    async (request, response, context) => {
        const { id } = request.params;
        if (!id || typeof id !== "string") {
            return response(context.status(400));
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
                data: createMockedAircraftType({ externalId: id, name: "VC2-1" }),
            })
        );
    }
);

export const getAllExternalAircraftTypeHandler = rest.get(
    `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/external/aircraft-types`,
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
                    createMockedAircraftType({ externalId: "type-1", name: "VC2-1" }),
                    createMockedAircraftType({ externalId: "type-2", name: "2X" }),
                ],
            })
        );
    }
);
