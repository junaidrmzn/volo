import { rest } from "msw";
import { createMockedRouteOption } from "../../features/__mocks__/routeOption";
import { mockedBaseUrl } from "../url";

export const getRouteOptionHandler = rest.get(
    `${mockedBaseUrl}/route-options/:resourceId`,
    async (request, response, context) => {
        if (!request.params.resourceId || Number.isNaN(+request.params.resourceId)) {
            return response(context.status(404));
        }

        const routeOption = createMockedRouteOption({ id: +request.params.resourceId });

        return response(
            context.json({
                isError: false,
                pagination: {
                    total: null,
                    limit: null,
                    offset: null,
                },
                error: {},
                data: routeOption,
            })
        );
    }
);

export const createRouteOptionHandler = rest.post(
    `${mockedBaseUrl}/route-options`,
    async (_request, response, context) => {
        return response(context.status(201));
    }
);
