import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PROMOTION_BASE_URL } from "../../../serviceEndpoints";
import { DiscountPayload } from "../apiModels";
import { useUploadPromotion } from "../useUploadPromotion";

const id = "00000000-0000-0000-0000-000000000001";
const someDate = new Date("2024-04-01T00:00:00Z");
const validFrom = someDate;
const validTo = someDate;
validTo.setDate(validFrom.getDate() + 1);
const promotion: DiscountPayload = {
    name: "Discount",
    validFrom: validFrom.toISOString(),
    validTo: validTo.toISOString(),
    codes: "codes",
    regionId: "00000000-0000-0000-0000-000000000002",
    regionName: "region",
    discountType: "PERCENTAGE",
    value: 10,
    type: "DISCOUNT",
    currency: "EUR",
};

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will upload a discount promotion", async () => {
        await provider.addInteraction({
            state: `upload discount promotion with id ${id}`,
            uponReceiving: "request to upload a discount promotion",
            withRequest: {
                path: `${PROMOTION_BASE_URL}/upload`,
                method: "POST",
                body: promotion,
            },
            willRespondWith: {
                status: 204,
            },
        });

        const { result, waitForNextUpdate } = renderHook(useUploadPromotion, {
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
                data: promotion,
            });
        });

        await waitForNextUpdate();
    });
});
