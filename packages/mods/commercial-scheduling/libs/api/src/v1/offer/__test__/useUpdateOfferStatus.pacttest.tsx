import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { OFFER_BASE_URL } from "../../../serviceEndpoints";
import { useUpdateOfferStatus } from "../useUpdateOfferStatus";

const { like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    const offerId = "00000000-0000-0000-0000-000000000001";
    test("will update the status of commercial offer for a plan", async () => {
        await provider.addInteraction({
            state: `request to approve commercial offer with id ${offerId}`,
            uponReceiving: "request to approve commercial offer of a plan",
            withRequest: {
                path: `${OFFER_BASE_URL}/${offerId}`,
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: {
                    status: "AWAITING_APPROVAL",
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: offerId,
                        commercialPlanId: "00000000-0000-0000-0000-000000000002",
                        status: "AWAITING_APPROVAL",
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

        const { result, waitForNextUpdate } = renderHook(() => useUpdateOfferStatus(offerId), {
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
            result.current.sendRequest({ data: { status: "AWAITING_APPROVAL" } });
        });

        await waitForNextUpdate();
    });
});
