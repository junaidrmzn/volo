import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { mockedBaseUrl } from "../../../testing/url";
import { anyFlightPlan } from "../flightPlan";
import type { CypressParameter, InterceptorOptions, MockResponse } from "./MockResponse";
import { checkParamsMatches, getResponseValues } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makePostFlightPlanInterceptor = (
    expectedResponse?: MockResponse<FlightPlanInfo>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<FlightPlanInfo>
) => {
    const { returnStatus, returnValue } = getResponseValues<FlightPlanInfo>(anyFlightPlan, 201, expectedResponse);
    const postFlightPlanInfoRegex = new RegExp(
        `^${mockedBaseUrl}/route-options/${anyFlightPlan().routeOption?.id}/flight-plans${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("POST", postFlightPlanInfoRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postFlightPlan");
};
