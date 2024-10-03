import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlanOffers } from "../useGetPlanOffers";

const { like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    it("will fetch a list of commercial plan offers", async () => {
        const planId = "00000000-0000-0000-0000-000000000001";
        const offerId = "00000000-0000-0000-0000-000000000002";
        await provider.addInteraction({
            state: "a commercial plan 00000000-0000-0000-0000-000000000001 has offers",
            uponReceiving: "request to a list of commercial plan offers",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}/commercial-offers`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: offerId,
                        commercialPlanId: planId,
                        status: "DRAFT",
                        commercialOfferItems: [
                            {
                                id: "00000000-0000-0000-0000-000000000003",
                                commercialOfferId: offerId,
                                offerRunwayUnit: "HOURS",
                                offerRunwayValue: 10,
                                validFrom: "2024-01-01T00:00:00.000Z",
                                validTo: "2024-12-31T00:00:00.000Z",
                            },
                        ],
                        isValidAllConnectionsAllDates: true,
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetPlanOffers(planId), {
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
