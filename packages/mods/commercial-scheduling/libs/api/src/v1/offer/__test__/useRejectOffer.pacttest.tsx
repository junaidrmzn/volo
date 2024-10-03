import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { OFFER_BASE_URL, OfferItem, useRejectOffer } from "../..";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";

const offerId = "00000000-0000-0000-0000-000000000001";
const commercialOfferItems: [OfferItem] = [
    {
        commercialPlanId: "00000000-0000-0000-0000-000000000003",
        id: "00000000-0000-0000-0000-000000000002",
        offerRunwayValue: 10,
        offerRunwayUnit: "HOURS",
        commercialOfferId: offerId,
        validFrom: "2024-01-01T00:00:00.000Z",
        validTo: "2024-12-31T00:00:00.000Z",
    },
];

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will approve commercial offer", async () => {
        await provider.addInteraction({
            state: `reject commercial offer with id ${offerId}`,
            uponReceiving: "request to reject commercial offer",
            withRequest: {
                path: `${OFFER_BASE_URL}/${offerId}/reject`,
                method: "PUT",
                body: {
                    comments: "comments",
                    commercialOfferItems,
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: {
                        id: offerId,
                        commercialPlanId: "00000000-0000-0000-0000-000000000003",
                        status: "DRAFT",
                        isValidAllConnectionsAllDates: true,
                        commercialOfferItems: [
                            {
                                id: "00000000-0000-0000-0000-000000000002",
                                commercialOfferId: offerId,
                                offerRunwayValue: 10,
                                offerRunwayUnit: "HOURS",
                                validFrom: "2024-01-01T00:00:00.000Z",
                                validTo: "2024-12-31T00:00:00.000Z",
                            },
                        ],
                    },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useRejectOffer(offerId), {
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
                    comments: "comments",
                    commercialOfferItems,
                },
            });
        });

        await waitForNextUpdate();
    });
});
