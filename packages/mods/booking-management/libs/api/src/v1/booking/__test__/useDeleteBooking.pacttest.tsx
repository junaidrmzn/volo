import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_BOOKING_API } from "../../../pactConstants";
import { BOOKINGS_URL } from "../../../serviceEndpoints";
import { useDeleteBooking } from "../useDeleteBooking";

const bookingId = `9fa12780-0f8c-4a17-a414-fe2c0a4bfc5e`;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_BOOKING_API }, (provider) => {
    test("will delete a booking by id", async () => {
        await provider.addInteraction({
            state: `Delete booking with bookingID ${bookingId}`,
            uponReceiving: "request to delete a booking by id",
            withRequest: {
                path: `${BOOKINGS_URL}/${bookingId}`,
                method: "DELETE",
                body: {
                    cancelledBy: "CUSTOMER",
                },
            },
            willRespondWith: { status: 204 },
        });

        const { result, waitForNextUpdate } = renderHook(useDeleteBooking, {
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
            result.current.sendRequestById(bookingId, {
                body: { cancelledBy: "CUSTOMER" },
            });
        });

        await waitForNextUpdate();
    });
});
