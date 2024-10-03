import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_PROCESS_BASE_URL } from "../../../serviceEndpoints";
import { useGetPlanProcessProgress } from "../useGetPlanProcessProgress";

const { like } = Matchers;
const processId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a plan process progress by process id", async () => {
        await provider.addInteraction({
            state: `plan process progress with id ${processId} exists`,
            uponReceiving: "request to fetch a plan process progress by process id",
            withRequest: {
                path: `${PLAN_PROCESS_BASE_URL}/${processId}/progress`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like({
                        status: "FAILED",
                        comments: "comments",
                        errors: [
                            {
                                detailedError: "ValidationError",
                                attribute: "flight number",
                                value: "XZ3002, 2024-07-01, Test Plan",
                                message:
                                    "Flight number XZ3002 is not unique with respect to departure date 2024-07-01. Already used in commercial schedule plan Test Plan",
                                key: "#FLIGHT_NUM_UNIQUE",
                            },
                        ],
                    }),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetPlanProcessProgress(processId), {
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
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
