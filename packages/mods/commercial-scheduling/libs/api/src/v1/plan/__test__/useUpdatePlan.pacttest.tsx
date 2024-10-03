import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useUpdatePlan } from "../useUpdatePlan";

const { like } = Matchers;
const planId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will update a commercial plan", async () => {
        await provider.addInteraction({
            state: `update commercial plan with id ${planId}`,
            uponReceiving: "request to update a commercial plan",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}`,
                method: "PATCH",
                body: {
                    planName: "Plan Name",
                    isArchived: false,
                    isDeleted: false,
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: planId,
                        isArchived: false,
                        isDeleted: false,
                        regionId: "00000000-0000-0000-0000-000000000004",
                        planName: "Plan Name",
                        timeCreated: "2024-09-01T00:00:00.000Z",
                        regionName: "Region",
                        status: "DRAFT",
                        hasOffer: false,
                        hasPrice: false,
                        hasSchedule: true,
                        commercialSchedule: {
                            id: "00000000-0000-0000-0000-000000000002",
                            commercialPlanId: planId,
                            status: "APPROVED",
                            validFrom: "2024-01-01T00:00:00.000Z",
                            validTo: "2024-12-31T00:00:00.000Z",
                            totalScheduleItems: 1,
                            isImported: true,
                        },
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useUpdatePlan(planId), {
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
            result.current.sendRequest({ data: { planName: "Plan Name", isArchived: false, isDeleted: false } });
        });

        await waitForNextUpdate();
    });
});
