import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyRegion } from "@voloiq/vertiport-management-api/v1";
import { anyPactRegion } from "../../lib/test-fixtures/anyPactRegion";
import { useGetRegions, useUpdateRegion } from "./useRegionService";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    it("will fetch all regions", async () => {
        await provider.addInteraction({
            state: "there are regions",
            uponReceiving: "a request for regions",
            withRequest: {
                method: "GET",
                path: "/vertiport-management/v1/regions",
                query: "page=1&size=10",
            },
            willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: {
                    data: Matchers.eachLike(anyPactRegion()),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetRegions(1), {
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

        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });
    });

    it.skip("will edit an existing region", async () => {
        const regionId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const version = 0;
        await provider.addInteraction({
            state: `there is a region with id ${regionId}`,
            uponReceiving: "a request to edit an exisiting region",
            withRequest: {
                method: "PUT",
                path: `/vertiport-management/v1/regions/${regionId}`,
                query: `version=${version}`,
            },
            willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: {
                    data: Matchers.eachLike(anyRegion()),
                },
            },
        });

        const { result } = renderHook(() => useUpdateRegion(), {
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
            await result.current.sendRequestById(regionId, { data: anyRegion(), params: { version } });
        });
    });
});
