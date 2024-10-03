import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { CONNECTION_BASE_URL } from "../../../serviceEndpoints";
import { useGetConnections } from "../useGetConnections";

const { eachLike, like } = Matchers;

const connectionId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a list of connections", async () => {
        await provider.addInteraction({
            state: `connections exists`,
            uponReceiving: "request to fetch a list of connections",
            withRequest: {
                path: CONNECTION_BASE_URL,
                method: "GET",
                query: { size: "10", page: "1" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: connectionId,
                        aircraftTypeId: "00000000-0000-0000-0000-000000000002",
                        regionId: "00000000-0000-0000-0000-000000000003",
                        departureVertiportUuid: "00000000-0000-0000-0000-000000000004",
                        arrivalVertiportUuid: "00000000-0000-0000-0000-000000000005",
                        routeId: "00000000-0000-0000-0000-000000000006",
                        routeOptionId: "00000000-0000-0000-0000-000000000007",
                    }),
                    error: null,
                    pagination: { page: like(1), size: like(10), totalPages: like(1), totalElements: like(1) },
                    meta: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(useGetConnections, {
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

        await waitForNextUpdate();
    });
});
