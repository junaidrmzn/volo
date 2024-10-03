import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_VERTIPORT_MANAGEMENT_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { REGION_BASE_URL } from "../../../serviceEndpoints";
import { anyRegion } from "../anyRegion";
import { useGetRegions } from "../useGetRegions";

const { eachLike, like } = Matchers;

pactWith.skip({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_VERTIPORT_MANAGEMENT_API }, (provider) => {
    test("will fetch a list of region for commercial schedule", async () => {
        await provider.addInteraction({
            state: "a list of region for commercial schedule",
            uponReceiving: "request to fetch a list of region for commercial schedule",
            withRequest: {
                path: REGION_BASE_URL,
                method: "GET",
                query: {
                    page: "1",
                    size: "100",
                    orderBy: "name",
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike(pactify(anyRegion)()),
                    pagination: {
                        totalElements: like(1),
                        page: like(1),
                        size: like(1),
                    },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useGetRegions, {
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
            result.current.sendRequest();
        });

        await waitForNextUpdate();
    });
});
