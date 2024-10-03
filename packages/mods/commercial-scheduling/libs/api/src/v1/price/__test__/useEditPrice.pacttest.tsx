import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PRICE_ITEM_BASE_URL } from "../../../serviceEndpoints";
import { useEditPrice } from "../useEditPrice";

const { like } = Matchers;
const priceId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will update a commercial price", async () => {
        await provider.addInteraction({
            state: `update commercial price with id ${priceId}`,
            uponReceiving: "request to update a commercial price",
            withRequest: {
                path: `${PRICE_ITEM_BASE_URL}/${priceId}`,
                method: "PATCH",
                body: {
                    price: 210,
                    currency: "EUR",
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: priceId,
                        commercialPriceId: "00000000-0000-0000-0000-000000000002",
                        price: 210,
                        validFrom: "2024-01-01T00:00:00.000Z",
                        validTo: "2024-12-31T00:00:00.000Z",
                        connectionId: null,
                        day: null,
                        currency: "EUR",
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useEditPrice(priceId), {
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
            result.current.sendRequest({ data: { price: 210, currency: "EUR" } });
        });

        await waitForNextUpdate();
    });
});
