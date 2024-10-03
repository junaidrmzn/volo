import type { RouteEnergySettings } from "@voloiq-typescript-api/flight-planning-types";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { anySocSettings } from "../socSettings";
import type { CypressParameter, InterceptorOptions, MockResponse } from "./MockResponse";
import { checkParamsMatches, getResponseValues } from "./MockResponse";

export const makePatchEnergySettingsInterceptor = (
    expectedResponse?: MockResponse<RouteEnergySettings>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteEnergySettings>
) => {
    const { returnStatus, returnValue } = getResponseValues<RouteEnergySettings>(anySocSettings, 200, expectedResponse);
    const patchEnergySettingsRegex = new RegExp(`^${mockedBaseUrl}/routes/${anyRoute()?.id}/energy-settings$`, "m");
    return cy
        .intercept("PATCH", patchEnergySettingsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchEnergySettings");
};
