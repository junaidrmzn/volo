import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PROMOTION_BASE_URL } from "../../../serviceEndpoints";
import { useGetDiscounts } from "../useGetDiscounts";

const { eachLike, like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    it("will fetch a list of discounts", async () => {
        await provider.addInteraction({
            state: "a list of discounts",
            uponReceiving: "request to fetch a list of discounts",
            withRequest: {
                path: `${PROMOTION_BASE_URL}/discounts`,
                method: "GET",
                query: { size: "10", page: "1" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: "00000000-0000-0000-0000-000000000001",
                        name: "discount",
                        status: "DRAFT",
                        validFrom: "2024-02-01T00:00:00Z",
                        validTo: "2024-02-10T00:00:00Z",
                        regionId: "00000000-0000-0000-0000-000000000002",
                        regionName: "region",
                        discountType: "AMOUNT",
                        symbol: "EUR",
                        value: 10,
                        itemsCount: 1,
                    }),
                    error: null,
                    meta: null,
                    pagination: { page: like(1), size: like(10), totalPages: like(1), totalElements: like(1) },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useGetDiscounts, {
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
            result.current.sendRequestWithResponseEnvelope();
        });

        await waitForNextUpdate();
    });
});
