import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlanPrices } from "../useGetPrices";

const { like } = Matchers;
const planId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    it("will fetch a list of commercial price", async () => {
        await provider.addInteraction({
            state: `commercial price against commercial plan with id ${planId}`,
            uponReceiving: "request to fetch a list of commercial price",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}/commercial-prices`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: "00000000-0000-0000-0000-000000000002",
                        commercialPlanId: planId,
                        status: "DRAFT",
                        isValidAllConnectionsAllDates: true,
                        commercialPriceItems: [
                            {
                                id: "00000000-0000-0000-0000-000000000003",
                                price: 210,
                                validFrom: "2024-01-01T00:00:00.000Z",
                                validTo: "2024-12-31T00:00:00.000Z",
                                connectionId: null,
                                day: null,
                                currency: "EUR",
                                commercialPriceId: "00000000-0000-0000-0000-000000000002",
                            },
                        ],
                        comments: "comments",
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetPlanPrices(planId), {
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
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
