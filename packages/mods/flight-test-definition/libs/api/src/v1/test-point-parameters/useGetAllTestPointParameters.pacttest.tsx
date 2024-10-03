import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllTestPointParameters } from "./useGetAllTestPointParameters";

const { eachLike, uuid, like, term, boolean } = Matchers;

const allTestPointParametersRequest = (): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/test-point-parameters`,
        matcher: "\\/ftd\\/v1\\/test\\-point\\-parameters.*",
    }),
    method: "GET",
});

const allProceduresResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            name: like("Test Point Parameter"),
            acronym: like("AB1"),
            unit: like("m"),
            isActive: boolean(),
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test point parameters", async () => {
        await provider.addInteraction({
            state: `there are test point parameters`,
            uponReceiving: `a request for all test parameters`,
            withRequest: allTestPointParametersRequest(),
            willRespondWith: allProceduresResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllTestPointParameters(), {
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

        act(() => {
            result.current.sendRequestWithResponseEnvelope();
        });

        await waitForNextUpdate();
    });
});
