import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllFtiParameters } from "./useGetAllFtiParameters";

const { like, uuid, term } = Matchers;

const allParametersRequest = (): RequestOptions => ({
    path: term({
        generate: "/ftd/v2/instrumentation-parameters",
        matcher: "\\/ftd\\/v2\\/instrumentation\\-parameters.*",
    }),
    method: "GET",
});
const allParametersResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: {
            id: uuid(),
            shortDescription: like("Foo"),
            workgroup: {
                label: like("Foo"),
            },
            ataIspec: {
                label: like("Foo"),
            },
            aircraftZone: {
                label: like("Foo"),
            },
            sensorType: {
                label: like("Foo"),
            },
            ftiCode: like("2012390"),
        },
    },
});

pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all parameters", async () => {
        await provider.addInteraction({
            state: "there are parameters",
            uponReceiving: "a request for all parameters",
            withRequest: allParametersRequest(),
            willRespondWith: allParametersResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(useGetAllFtiParameters, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <LocalFeatureFlagsProvider>
                                <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                            </LocalFeatureFlagsProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.getAllFtiParameters();
        });

        await waitForNextUpdate();
    });
});
