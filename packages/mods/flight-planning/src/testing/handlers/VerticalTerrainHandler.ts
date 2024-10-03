import { rest } from "msw";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { mockedVerticalTerrain } from "../../features/__mocks__/verticalTerrain";
import { mockedBaseUrl } from "../url";

const mockRoute = anyRoute();
export const postVerticalTerrainHandler = rest.post(
    `${mockedBaseUrl}/routes/${mockRoute.id}/terrain`,
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
                data: mockedVerticalTerrain,
            })
        );
    }
);

export const getVerticalTerrainHandler = rest.get(
    `${mockedBaseUrl}/routes/${mockRoute.id}/terrain`,
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
                data: mockedVerticalTerrain,
            })
        );
    }
);
