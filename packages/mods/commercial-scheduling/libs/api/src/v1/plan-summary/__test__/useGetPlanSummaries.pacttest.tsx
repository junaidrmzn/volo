import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlanSummaries } from "../useGetPlanSummaries";

const { eachLike, like } = Matchers;
const planId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a list of plan summary item", async () => {
        await provider.addInteraction({
            state: "a list of plan summary item",
            uponReceiving: "request to fetch a list of plan summary item",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}/summary`,
                method: "GET",
                query: { size: "10", page: "1" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: "00000000-0000-0000-0000-000000000002",
                        commercialPlanId: planId,
                        commercialPlanStatus: "DRAFT",
                        commercialScheduleItemStatus: "DRAFT",
                        flightNumber: "XZ0001",
                        departureVertiportCode: "D01",
                        arrivalVertiportCode: "A01",
                        departureTime: "2024-01-01T15:00:00.000Z",
                        arrivalTime: "2024-01-01T16:00:00.000Z",
                        aircraftTypeName: "aircraft",
                        prices: [
                            {
                                price: 5,
                                currency: "EUR",
                            },
                        ],
                        offers: [
                            {
                                offerRunwayValue: 1,
                                offerRunwayUnit: "HOURS",
                            },
                        ],
                        scheduleItemConnectionStatus: "CONSISTENT",
                        isCustomized: true,
                        isNoCustomOffer: false,
                        isCustomOverwritten: false,
                        customCommercialScheduleItemId: "00000000-0000-0000-0000-000000000003",
                        customItemStatus: "DRAFT",
                        customPrice: 10,
                        customOfferRunwayUnit: "HOURS",
                        customOfferRunwayValue: 2,
                        customComments: "comments",
                        isDeleted: false,
                        isCustomScheduleItemDeletionReq: false,
                    }),
                    error: null,
                    meta: null,
                    pagination: { page: like(1), size: like(10), totalPages: like(1), totalElements: like(1) },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetPlanSummaries(planId), {
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
