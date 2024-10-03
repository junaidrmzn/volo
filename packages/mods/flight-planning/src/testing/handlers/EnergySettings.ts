import { rest } from "msw";
import { anyEnergySettings } from "../../features/__mocks__/energySettings";
import { mockedBaseUrl } from "../url";

export const getEnergySettingsHandler = rest.patch(
    `${mockedBaseUrl}/routes/:routeId/energy-settings`,
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
                data: anyEnergySettings(),
            })
        );
    }
);
