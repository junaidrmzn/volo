import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../libs/api/config/pactConfig";
import { useAddParameter } from "./useAddParameter";

const { like } = Matchers;

const addParameterRequest: RequestOptions = {
    path: "/ftd/v1/test-point-parameters",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        name: like("Pressure Altitude"),
        unit: like("ff"),
        acronym: like("α"),
    },
};
const allParametersResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates a parameter", async () => {
        await provider.addInteraction({
            state: "",
            uponReceiving: "a request for creating a parameter",
            withRequest: addParameterRequest,
            willRespondWith: allParametersResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useAddParameter, {
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
            result.current.addParameter({
                data: {
                    name: "Pressure Altitude",
                    unit: "ff",
                    acronym: "α",
                },
            });
        });

        await waitForNextUpdate();
    });
});
