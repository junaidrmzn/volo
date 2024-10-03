import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PRICE_BASE_URL } from "../../../serviceEndpoints";
import { useApprovePrice } from "../useApprovePrice";

const priceId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will approve commercial price", async () => {
        await provider.addInteraction({
            state: `commercial price approval with id ${priceId} and status AWAITING_APPROVAL exists`,
            uponReceiving: "request to approve commercial price",
            withRequest: {
                path: `${PRICE_BASE_URL}/${priceId}/approve`,
                method: "PUT",
                body: {
                    commercialPriceItems: [
                        {
                            commercialPlanId: "00000000-0000-0000-0000-000000000003",
                            id: "00000000-0000-0000-0000-000000000002",
                            price: 100.5,
                            currency: "EUR",
                            commercialPriceId: priceId,
                            validFrom: "2024-01-01T00:00:00.000Z",
                            validTo: "2024-12-31T00:00:00.000Z",
                            connectionId: null,
                            day: null,
                        },
                    ],
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: {
                        id: priceId,
                        commercialPlanId: "00000000-0000-0000-0000-000000000003",
                        status: "APPROVED",
                        isValidAllConnectionsAllDates: true,
                        commercialPriceItems: [
                            {
                                id: "00000000-0000-0000-0000-000000000002",
                                commercialPriceId: priceId,
                                price: 100.5,
                                validFrom: "2024-01-01T00:00:00.000Z",
                                validTo: "2024-12-31T00:00:00.000Z",
                                currency: "EUR",
                            },
                        ],
                    },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useApprovePrice(priceId), {
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
            result.current.sendRequest({
                data: {
                    commercialPriceItems: [
                        {
                            commercialPlanId: "00000000-0000-0000-0000-000000000003",
                            id: "00000000-0000-0000-0000-000000000002",
                            price: 100.5,
                            currency: "EUR",
                            commercialPriceId: priceId,
                            validFrom: "2024-01-01T00:00:00.000Z",
                            validTo: "2024-12-31T00:00:00.000Z",
                            connectionId: null,
                            day: null,
                        },
                    ],
                },
            });
        });

        await waitForNextUpdate();
    });
});
