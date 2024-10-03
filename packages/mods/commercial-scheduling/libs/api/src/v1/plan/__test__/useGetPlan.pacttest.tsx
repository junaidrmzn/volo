import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlan } from "../useGetPlan";

const { like } = Matchers;
const planId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a commercial plan by id", async () => {
        await provider.addInteraction({
            state: `commercial plan with id ${planId} exists`,
            uponReceiving: "request to fetch a commercial plan by id",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        id: planId,
                        planName: "Plan",
                        timeCreated: "2024-09-01T00:00:00.000Z",
                        regionId: "00000000-0000-0000-0000-000000000002",
                        regionName: "The Region",
                        status: "DRAFT",
                        isArchived: false,
                        isDeleted: false,
                        hasOffer: false,
                        hasPrice: false,
                        hasSchedule: true,
                        commercialSchedule: {
                            id: "00000000-0000-0000-0000-000000000003",
                            commercialPlanId: "00000000-0000-0000-0000-000000000001",
                            status: "APPROVED",
                            validFrom: "2024-01-01T00:00:00.000Z",
                            validTo: "2024-12-31T00:00:00.000Z",
                            totalScheduleItems: 1,
                            isImported: false,
                        },
                        scheduleItemWrtConnectionState: "ALL_CONSISTENT",
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(() => useGetPlan(planId), {
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

        await waitForNextUpdate();
    });
});
