import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../../serviceEndpoints";
import { useAddPlanSummary } from "../useAddPlanSummary";

const { like } = Matchers;
const scheduleId = "00000000-0000-0000-0000-000000000003";
pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will create customized plan summary item of a commercial plan", async () => {
        await provider.addInteraction({
            state: "add customization for plan summary item",
            uponReceiving: "request to customized plan summary item of a commercial plan",
            withRequest: {
                path: `${PLAN_CUSTOMIZATION_BASE_URL}`,
                method: "POST",
                body: {
                    commercialScheduleItemId: scheduleId,
                    isNoCustomOffer: false,
                    customPrice: 20,
                },
            },
            willRespondWith: {
                status: 201,
                body: {
                    data: like({
                        id: "00000000-0000-0000-0000-000000000004",
                        commercialScheduleItemId: scheduleId,
                        status: "DRAFT",
                        isNoCustomOffer: false,
                        customPrice: 20,
                        customOfferRunwayUnit: null,
                        customOfferRunwayValue: null,
                        customComments: null,
                        isDeleted: false,
                        isScheduleItemDeletionRequest: false,
                    }),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useAddPlanSummary(), {
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
                    commercialScheduleItemId: scheduleId,
                    isNoCustomOffer: false,
                    customPrice: 20,
                },
            });
        });

        await waitForNextUpdate();
    });
});
