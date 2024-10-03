import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyRegion, anyRegionCreate } from "@voloiq/vertiport-management-api/v1";
import { anyPactRegion, anyPactRegionCreate } from "../../../lib/test-fixtures/anyPactRegion";
import { useCreateRegion } from "../useRegionService";

const addRegionRequest = (): RequestOptions => ({
    path: `/vertiport-management/v1/regions`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: anyPactRegionCreate(),
});
const addRegionResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactRegion()),
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test("creates a region", async () => {
        await provider.addInteraction({
            state: "no regions exist",
            uponReceiving: "a request for creating a region",
            withRequest: addRegionRequest(),
            willRespondWith: addRegionResponse,
        });

        const { result } = renderHook(useCreateRegion, {
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

        await act(async () => {
            await result.current.sendRequest({
                data: anyRegionCreate(),
            });
        });

        expect(result.current.data).toEqual(anyRegion());

        expect(result.current.statusCode).toEqual(201);
    });
});
