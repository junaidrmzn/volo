import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PRICE_BASE_URL } from "../../../serviceEndpoints";
import { useAddPrice } from "../useAddPrice";

const { like } = Matchers;
const priceId = "00000000-0000-0000-0000-000000000001";
const priceItem = {
    id: "00000000-0000-0000-0000-000000000003",
    price: 210,
    validFrom: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T00:00:00.000Z",
    connectionId: null,
    day: null,
    currency: "EUR",
    commercialPriceId: priceId,
};

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will create price items of a commercial price", async () => {
        await provider.addInteraction({
            state: "add price item for all days and all routes in commercial price",
            uponReceiving: "request to create price items of a commercial price",
            withRequest: {
                path: `${PRICE_BASE_URL}/${priceId}/commercial-price-items/all-days-all-routes`,
                method: "POST",
                body: {
                    price: 210,
                    currency: "EUR",
                },
            },
            willRespondWith: {
                status: 201,
                body: {
                    data: like(priceItem),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useAddPrice(priceId), {
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
