import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PRICE_BASE_URL } from "../../../serviceEndpoints";
import { PriceItem } from "../../price-item/apiModels";
import { PriceStatus } from "../apiModels";
import { useRejectPrice } from "../useRejectPrice";

const priceId = "00000000-0000-0000-0000-000000000001";
const commercialPriceItems: [PriceItem] = [
    {
        id: "00000000-0000-0000-0000-000000000002",
        price: 210,
        validFrom: "2024-01-01T00:00:00.000Z",
        validTo: "2024-12-31T00:00:00.000Z",
        connectionId: null,
        day: null,
        currency: "EUR",
        commercialPriceId: priceId,
    },
];
const priceItem = {
    id: priceId,
    commercialPlanId: "00000000-0000-0000-0000-000000000003",
    status: "AWAITING_APPROVAL" as PriceStatus,
    isValidAllConnectionsAllDates: true,
    comments: "comments",
    commercialPriceItems,
};
pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will reject commercial price", async () => {
        await provider.addInteraction({
            state: `reject commercial price with id ${priceId}`,
            uponReceiving: "request to reject commercial price",
            withRequest: {
                path: `${PRICE_BASE_URL}/${priceId}/reject`,
                method: "PUT",
                body: priceItem,
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: { ...priceItem, status: "DRAFT" },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useRejectPrice(priceId), {
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
            result.current.sendRequest({ data: priceItem });
        });

        await waitForNextUpdate();
    });
});
