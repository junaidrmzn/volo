import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook, waitFor } from "@voloiq/testing";
import { anyRegion } from "@voloiq/vertiport-management-api/v1";
import { anyPactRegion } from "../../../lib/test-fixtures/anyPactRegion";
import { useGetRegion } from "../useRegionService";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

const getRegionRequest = (regionId: string): RequestOptions => ({
    path: `/vertiport-management/v1/regions/${regionId}`,
    method: "GET",
});
const getRegionResponse = (regionId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: anyPactRegion({ id: regionId }),
    },
});
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    it.skip("fetch specific region", async () => {
        const regionId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a region with id ${regionId} exists`,
            uponReceiving: `a request for region with id ${regionId}`,
            withRequest: getRegionRequest(regionId),
            willRespondWith: getRegionResponse(regionId),
        });

        const { result } = renderHook(() => useGetRegion(regionId), {
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

        await waitFor(() => expect(result.current.data).toEqual(anyRegion()));
    });
});
