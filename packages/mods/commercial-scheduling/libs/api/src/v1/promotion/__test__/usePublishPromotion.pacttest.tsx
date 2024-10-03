import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { PROMOTION_BASE_URL } from "../../../serviceEndpoints";
import { anyEarlyAccess } from "../anyEarlyAccess";
import { usePublishPromotion } from "../usePublishPromotion";

const { like } = Matchers;
const promotionId = "00000000-0000-0000-0000-000000000001";
pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will publish request for a promotion item to be published for mobile app", async () => {
        await provider.addInteraction({
            state: `publish promotion items for promotion with id ${promotionId}`,
            uponReceiving: "request to publish a promotion item",
            withRequest: {
                path: `${PROMOTION_BASE_URL}/${promotionId}/publish`,
                method: "PUT",
                body: null,
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like(
                        pactify(() =>
                            anyEarlyAccess({
                                id: promotionId,
                                name: "early access promotion",
                                status: "PUBLISHED",
                                validFrom: "2024-02-01T00:00:00Z",
                                validTo: "2024-02-10T00:00:00Z",
                                regionId: "00000000-0000-0000-0000-000000000002",
                            })
                        )()
                    ),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => usePublishPromotion(promotionId), {
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
            result.current.sendRequest({});
        });

        await waitForNextUpdate();
    });
});
