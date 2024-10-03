import { rest } from "msw";
import { mockedVertiport1, mockedVertiport2 } from "../../features/__mocks__/vertiports";
import { mockedBaseUrl } from "../url";

export const getVertiportsHandler = rest.get(`${mockedBaseUrl}/vertiports`, async (_request, response, context) => {
    return response(
        context.json({
            isError: false,
            pagination: {
                total: null,
                limit: null,
                offset: null,
            },
            error: {},
            data: [mockedVertiport1, mockedVertiport2],
        })
    );
});
