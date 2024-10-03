import { rest } from "msw";
import { createMockedRouteOption } from "../../features/__mocks__/routeOption";
import { mockedBaseUrl } from "../url";

export const getRouteOptionsHandler = rest.get(`${mockedBaseUrl}/route-options`, async (request, response, context) => {
    return response(
        context.json({
            isError: false,
            pagination: {
                total: null,
                limit: null,
                offset: null,
            },
            error: {},
            data: [createMockedRouteOption({ id: 1 }), createMockedRouteOption()],
        })
    );
});
