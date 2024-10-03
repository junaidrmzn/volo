import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useApprovePlan } from "../useApprovePlan";

const planId = "00000000-0000-0000-0000-000000000001";
pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will approve commercial plan", async () => {
        await provider.addInteraction({
            state: `commercial plan approval with id ${planId}`,
            uponReceiving: "request to approve commercial plan",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}/approve`,
                method: "PUT",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: {
                        id: planId,
                        planName: "Test Plan",
                        timeCreated: "2024-09-01T00:00:00.000Z",
                        regionId: "00000000-0000-0000-0000-000000000002",
                        regionName: "Region",
                        status: "APPROVED",
                        isArchived: false,
                        isDeleted: false,
                        commercialSchedule: {
                            id: "00000000-0000-0000-0000-000000000003",
                            validFrom: "2024-01-01T00:00:00.000Z",
                            validTo: "2024-12-31T00:00:00.000Z",
                            status: "APPROVED",
                            totalScheduleItems: 1,
                            isImported: true,
                            commercialPlanId: planId,
                        },
                        hasSchedule: true,
                        hasOffer: true,
                        hasPrice: true,
                    },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useApprovePlan(planId), {
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
