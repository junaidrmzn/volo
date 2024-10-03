import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { CONNECTION_BASE_URL } from "../../../serviceEndpoints";
import { Category } from "../apiModels";
import { useCreateConnection } from "../useCreateConnection";

const { like } = Matchers;
const connectionId = "00000000-0000-0000-0000-000000000001";
export const theConnection = {
    id: connectionId,
    aircraftTypeId: "00000000-0000-0000-0000-000000000002",
    regionId: "00000000-0000-0000-0000-000000000003",
    departureVertiportUuid: "00000000-0000-0000-0000-000000000004",
    arrivalVertiportUuid: "00000000-0000-0000-0000-000000000005",
    routeId: "00000000-0000-0000-0000-000000000006",
    routeOptionId: "00000000-0000-0000-0000-000000000007",

    name: "Connection",
    flightDuration: 1,
    validFrom: "2024-01-01T00:00:00.000Z",
    title: "Title",
    subtitle: "Sub Title",
    category: "DIRECT" as Category,
    passengerSeats: 1,
    updatedAt: "2024-01-01T00:00:00.000Z",
    validTo: "2025-01-01T00:00:00.000Z",

    aircraftTypeName: "Aircraft Type",

    regionName: "Region",

    departureVertiportCode: "DEP",
    arrivalVertiportCode: "ARR",
    routeOptionName: "Route Option",
};

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will create a connection", async () => {
        await provider.addInteraction({
            state: `connection creation with id ${connectionId}`,
            uponReceiving: "request to create a connection",
            withRequest: {
                path: `${CONNECTION_BASE_URL}`,
                method: "POST",
                body: theConnection,
            },
            willRespondWith: {
                status: 201,
                body: {
                    data: like(theConnection),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useCreateConnection, {
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
            result.current.sendRequest({ data: theConnection });
        });

        await waitForNextUpdate();
    });
});
