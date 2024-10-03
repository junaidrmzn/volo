import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { anyWorkOrder } from "./anyWorkOrder";
import { useGetWorkOrders } from "./useGetWorkOrders";

const { like } = Matchers;

const getWorkOrdersRequest = (aircraftId: string): RequestOptions => ({
    path: `${aircraftManagementBaseUrl}/aircraft/${aircraftId}/work-orders`,
    method: "GET",
});

const getWorkOrdersResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyWorkOrder()],
    }),
});

pactWith({ consumer: "voloiq.aircraft-management.ui", provider: "voloiq.aircraft-management.api" }, (provider) => {
    test("fetches all work orders", async () => {
        const aircraftId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `there is an aircraft with id ${aircraftId}`,
            uponReceiving: "a request to get work orders for aircraft",
            withRequest: getWorkOrdersRequest(aircraftId),
            willRespondWith: getWorkOrdersResponse(),
        });

        const { waitForNextUpdate } = renderHook(() => useGetWorkOrders({ aircraftId, manual: false }), {
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
