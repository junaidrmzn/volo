import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyPactTestPointParameter } from "./anyPactTestPointParameter";
import { useFetchParameter } from "./useFetchParameter";

const { term } = Matchers;

const parameterRequest = (parameterId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v2/test-point-parameters/${parameterId}`,
        matcher: "\\/ftd\\/v2\\/test\\-point\\-parameters\\/[\\da-fA-F\\-]+",
    }),
    method: "GET",
});
const parameterResponse = (parameterId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: anyPactTestPointParameter({ id: parameterId }),
    },
});
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a specific parameter", async () => {
        const parameterId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a parameter with id ${parameterId} exists`,
            uponReceiving: `a request for parameter with id ${parameterId}`,
            withRequest: parameterRequest(parameterId),
            willRespondWith: parameterResponse(parameterId),
        });

        const { result } = renderHook(useFetchParameter, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        const response = await actAndGet(() => result.current.fetchParameter(parameterId));

        expect(response?.data).toEqual(expect.any(Object));
    });
});
