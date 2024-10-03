import { mockedBaseUrl } from "../../../testing/url";
import { numberRegex, parameterRegex } from "./RegexTemplate";

export const makeGetAirspacesInterceptor = () => {
    const getAirspaces = new RegExp(`^${mockedBaseUrl}/route-options/${numberRegex}/airspaces${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAirspaces, (request) => {
            request.reply({
                fixture: "airspaces.json",
            });
        })
        .as("getAirspaces");
};
