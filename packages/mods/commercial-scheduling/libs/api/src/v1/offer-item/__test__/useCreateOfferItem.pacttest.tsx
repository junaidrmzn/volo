import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { OFFER_BASE_URL } from "../../../serviceEndpoints";
import { useCreateOfferItem } from "../useCreateOfferItem";

const { like } = Matchers;
const offerId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will create a commercial offer item", async () => {
        await provider.addInteraction({
            state: `add offer item for all days and all routes in commercial offer`,
            uponReceiving: "request to create offer items of a commercial offer",
            withRequest: {
                path: `${OFFER_BASE_URL}/${offerId}/commercial-offer-items/all-days-all-routes`,
                method: "POST",
                body: {
                    offerRunwayValue: 10,
                    offerRunwayUnit: "HOURS",
                },
            },
            willRespondWith: {
                status: 201,
                body: {
                    data: like({
                        id: "00000000-0000-0000-0000-000000000003",
                        offerRunwayUnit: "HOURS",
                        offerRunwayValue: 10,
                        validFrom: "2024-01-01T00:00:00.000Z",
                        validTo: "2024-12-31T00:00:00.000Z",
                        commercialOfferId: offerId,
                    }),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useCreateOfferItem(offerId), {
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
            result.current.sendRequest({ data: { offerRunwayValue: 10, offerRunwayUnit: "HOURS" } });
        });

        await waitForNextUpdate();
    });
});
