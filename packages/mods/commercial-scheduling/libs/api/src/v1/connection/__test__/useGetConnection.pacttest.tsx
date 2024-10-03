import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { CONNECTION_BASE_URL } from "../../../serviceEndpoints";
import { useGetConnection } from "../useGetConnection";

const { like } = Matchers;
const connectionId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a connection by id", async () => {
        await provider.addInteraction({
            state: `connection with id ${connectionId} exists`,
            uponReceiving: "request to fetch a connection by id",
            withRequest: {
                path: `${CONNECTION_BASE_URL}/${connectionId}`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: connectionId,
                        aircraftTypeId: "00000000-0000-0000-0000-000000000002",
                        regionId: "00000000-0000-0000-0000-000000000003",
                        departureVertiportUuid: "00000000-0000-0000-0000-000000000004",
                        arrivalVertiportUuid: "00000000-0000-0000-0000-000000000005",
                        routeId: "00000000-0000-0000-0000-000000000006",
                        routeOptionId: "00000000-0000-0000-0000-000000000007",
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(() => useGetConnection(connectionId), {
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
