import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetRouteTemplates } from "../getRoutesTemplates";
import { anyRouteTemplate } from "./anyRouteTemplate";

type RouteTemplatesParams = {
    orderBy: string;
    departureExternalVertiport: string;
    arrivalExternalVertiport: string;
};

const { eachLike } = Matchers;
const getRoutesTemplateRequest = (params: RouteTemplatesParams): RequestOptions => ({
    method: "GET",
    path: `${FLIGHT_PLANNING_V1}/route-templates`,
    query: params,
});
const getRoutesTemplateResponse: ResponseOptions = {
    status: 200,
    body: {
        data: eachLike(pactify(anyRouteTemplate)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch all route template", async () => {
        const params: RouteTemplatesParams = {
            orderBy: "createdAt:DESC",
            departureExternalVertiport: "1",
            arrivalExternalVertiport: "2",
        };

        await provider.addInteraction({
            state: `route templates exist between departure Vertiport with id ${params.departureExternalVertiport} and arrival Vertiport with id ${params.arrivalExternalVertiport}`,
            uponReceiving: "request to fetch route templates with specified departure and arrival Vertiport",
            withRequest: getRoutesTemplateRequest(params),
            willRespondWith: getRoutesTemplateResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            () => useGetRouteTemplates(true, params),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
