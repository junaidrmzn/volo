import { rest } from "msw";
import { mockedBaseUrl } from "../url";

export const getUtmServiceProvidersHandler = rest.get(
    `${mockedBaseUrl}/flight-plans/service-providers`,
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
                    {
                        id: 1,
                        countryCode: "DE",
                        name: "DFS",
                    },
                    {
                        id: 2,
                        countryCode: "FR",
                        name: "Hologarde",
                    },
                ],
            })
        );
    }
);
