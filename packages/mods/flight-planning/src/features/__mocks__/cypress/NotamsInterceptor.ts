import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { parameterRegex } from "./RegexTemplate";

export const makePostNotamInterceptor = () => {
    const postNotamsRegex = new RegExp(
        `^${mockedBaseUrl}/route-options/${anyRoute().routeOptionId}/notams${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("POST", postNotamsRegex, (request) => {
            request.reply({
                fixture: "notams.json",
            });
        })
        .as("postNotam");
};

export const makeGeNotamsInterceptor = (routeOptionId: number, latitude: number, longitude: number) => {
    const jobId = "123";

    const notamsUrl = `${mockedBaseUrl}/route-options/${routeOptionId}/notams-job?latitude=${latitude}&longitude=${longitude}`;
    const jobIUrl = `${mockedBaseUrl}/jobs/${jobId}`;

    return cy
        .intercept("POST", notamsUrl, (request) => {
            request.reply({
                body: { data: { jobId } },
                statusCode: 202,
            });
        })
        .as("postNotams")
        .intercept("GET", jobIUrl, (request) => {
            request.reply({
                body: { data: { jobId, status: "finished" } },
                statusCode: 200,
            });
        })
        .as("getNotamsStatus")
        .intercept("GET", notamsUrl, (request) => {
            request.reply({
                fixture: "notams.json",
            });
        })
        .as("getNotams");
};
