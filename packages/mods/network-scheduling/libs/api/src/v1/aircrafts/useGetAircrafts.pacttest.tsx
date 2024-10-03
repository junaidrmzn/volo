import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { anyAircraft } from "./anyAircraft";
import { useGetAircrafts } from "./useGetAircrafts";

const { like } = Matchers;

const getAircraftsRequest = (): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/aircraft`,
    query: "page=1&size=100&orderBy=msn",
    method: "GET",
});

const getAircraftsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyAircraft],
    }),
});

pactWith({ consumer: "voloiq.network-scheduling.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("fetches aircrafts with reservations", async () => {
        await provider.addInteraction({
            state: `there are aircrafts with reservations`,
            uponReceiving: "a request for aircrafts with reservations",
            withRequest: getAircraftsRequest(),
            willRespondWith: getAircraftsResponse(),
        });

        const { waitForNextUpdate } = renderHook(() => useGetAircrafts({ manual: false }), {
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
