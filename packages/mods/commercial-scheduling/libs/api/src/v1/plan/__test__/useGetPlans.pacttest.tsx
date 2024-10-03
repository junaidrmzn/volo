import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlans } from "../useGetPlans";

const { eachLike, like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a list of commercial plans", async () => {
        await provider.addInteraction({
            state: "a list of commercial plans",
            uponReceiving: "request to fetch a list of commercial plans",
            withRequest: {
                path: PLAN_BASE_URL,
                method: "GET",
                query: { size: "10", page: "1" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: "00000000-0000-0000-0000-000000000001",
                        planName: "Plan",
                        timeCreated: "2024-09-01T00:00:00.000Z",
                        regionId: "00000000-0000-0000-0000-000000000002",
                        regionName: "Region",
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
                    }),
                    error: null,
                    pagination: { page: like(1), size: like(10), totalPages: like(1), totalElements: like(1) },
                    meta: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useGetPlans, {
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
            result.current.sendRequestWithResponseEnvelope({
                params: { size: 10, page: 1 },
            });
        });

        await waitForNextUpdate();
    });
});
