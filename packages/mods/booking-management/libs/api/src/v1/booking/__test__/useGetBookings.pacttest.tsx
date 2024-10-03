import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_BOOKING_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { BOOKING_BASE_URL } from "../../../serviceEndpoints";
import { anyBooking } from "../anyBooking";
import { useGetBookings } from "../useGetBookings";

const { eachLike, like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_BOOKING_API }, (provider) => {
    test("will fetch a list of bookings", async () => {
        await provider.addInteraction({
            state: "a list of bookings",
            uponReceiving: "request to fetch a list of bookings",
            withRequest: {
                path: BOOKING_BASE_URL,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike(pactify(anyBooking)()),
                    error: null,
                    pagination: { page: like(1), size: like(1), totalPages: like(1), totalElements: like(1) },
                    meta: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(useGetBookings, {
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
