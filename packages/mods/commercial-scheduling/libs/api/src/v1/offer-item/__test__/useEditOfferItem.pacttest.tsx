import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { useEditOfferItem } from "..";
import { OFFER_ITEM_BASE_URL } from "../..";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";

const { like } = Matchers;
const offerItemId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will update a commercial offer item", async () => {
        await provider.addInteraction({
            state: `update commercial offer item with id ${offerItemId}`,
            uponReceiving: "request to update a commercial offer item",
            withRequest: {
                path: `${OFFER_ITEM_BASE_URL}/${offerItemId}`,
                method: "PATCH",
                body: {
                    offerRunwayValue: 8,
                    offerRunwayUnit: "HOURS",
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: offerItemId,
                        commercialOfferId: "00000000-0000-0000-0000-000000000002",
                        offerRunwayValue: 8,
                        offerRunwayUnit: "HOURS",
                        validFrom: "2024-01-01T00:00:00.000Z",
                        validTo: "2024-12-31T00:00:00.000Z",
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useEditOfferItem(offerItemId), {
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
                    offerRunwayValue: 8,
                    offerRunwayUnit: "HOURS",
                },
            });
        });

        await waitForNextUpdate();
    });
});
