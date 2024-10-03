import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { v4 as uuidV4 } from "uuid";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_BOOKING_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { BOOKING_BASE_URL } from "../../../serviceEndpoints";
import { anyBooking } from "../anyBooking";
import { useGetBooking } from "../useGetBooking";

const bookingId = uuidV4();
const { like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_BOOKING_API }, (provider) => {
    test("will fetch a booking by id", async () => {
        await provider.addInteraction({
            state: `booking with id ${bookingId} exists`,
            uponReceiving: "request to fetch a booking by id",
            withRequest: {
                path: BOOKING_BASE_URL,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like(pactify(() => anyBooking({ id: bookingId }))()),
                    error: null,
                    pagination: null,
                    meta: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(useGetBooking, {
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
