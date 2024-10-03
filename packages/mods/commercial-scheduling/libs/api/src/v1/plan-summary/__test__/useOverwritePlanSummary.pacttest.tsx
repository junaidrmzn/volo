import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_CUSTOMIZATION_BASE_URL } from "../../../serviceEndpoints";
import { useOverwritePlanSummary } from "../useOverwritePlanSummary";

const { like } = Matchers;
const scheduleId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will reject and overwrite a customized plan summary item of a commercial plan", async () => {
        await provider.addInteraction({
            state: `overwrite customization item with id ${scheduleId}`,
            uponReceiving: "request to overwrite a customized plan summary item",
            withRequest: {
                path: `${PLAN_CUSTOMIZATION_BASE_URL}/${scheduleId}/overwrite`,
                method: "PUT",
                body: {
                    commercialScheduleItemId: scheduleId,
                    customPrice: 20,
                    customOfferRunwayUnit: "HOURS",
                    customOfferRunwayValue: 2,
                    customComments: "comments",
                    isNoCustomOffer: false,
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: "00000000-0000-0000-0000-000000000001",
                        commercialScheduleItemId: "00000000-0000-0000-0000-000000000002",
                        isNoCustomOffer: false,
                        status: "APPROVED",
                        isOverwritten: true,
                        customPrice: 20,
                        customOfferRunwayUnit: "HOURS",
                        customOfferRunwayValue: 2,
                        customComments: "comments",
                        isDeleted: false,
                        isScheduleItemDeletionRequest: false,
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useOverwritePlanSummary(scheduleId), {
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
                    customPrice: 20,
                    customOfferRunwayUnit: "HOURS",
                    customOfferRunwayValue: 2,
                    customComments: "comments",
                    isNoCustomOffer: false,
                },
            });
        });

        await waitForNextUpdate();
    });
});
