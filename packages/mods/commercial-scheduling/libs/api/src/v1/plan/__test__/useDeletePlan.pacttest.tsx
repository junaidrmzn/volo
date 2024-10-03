import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useDeletePlan } from "../useDeletePlan";

const planId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will delete a commercial plan", async () => {
        await provider.addInteraction({
            state: `delete commercial plan with id ${planId}`,
            uponReceiving: "request to delete a commercial plan",
            withRequest: {
                path: `${PLAN_BASE_URL}/${planId}`,
                method: "DELETE",
            },
            willRespondWith: {
                status: 204,
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useDeletePlan(planId), {
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
