import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { SCHEDULE_BASE_URL } from "../../../serviceEndpoints";
import { useGetScheduleItems } from "../useGetScheduleItems";

const { eachLike, like } = Matchers;
const scheduleId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a list of schedule item", async () => {
        await provider.addInteraction({
            state: `a list of schedule items against commercial schedule with id ${scheduleId}`,
            uponReceiving: "request to fetch a list of schedule item",
            withRequest: {
                path: `${SCHEDULE_BASE_URL}/${scheduleId}/commercial-schedule-items`,
                method: "GET",
                query: { size: "10", page: "1" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: "00000000-0000-0000-0000-000000000002",
                        flightNumber: "XZ0001",
                        status: "DRAFT",
                        connection: {
                            departureVertiportCode: "DEP",
                            arrivalVertiportCode: "ARR",
                        },
                        departureTime: "2024-01-01T14:00:00.000Z",
                        arrivalTime: "2024-01-01T14:30:00.000Z",
                        service: "PASSENGER",
                        operationType: "PILOTED",
                        numberOfPassengerSeats: 1,
                        bookingStartDifference: 1,
                        latestBookable: "2024-01-01T00:00:00.000Z",
                    }),
                    error: null,
                    meta: null,
                    pagination: { page: like(1), size: like(10), totalPages: like(1), totalElements: like(1) },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetScheduleItems(scheduleId), {
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
            result.current.sendRequestWithResponseEnvelope({
                params: { size: 10, page: 1 },
            });
        });

        await waitForNextUpdate();
    });
});
