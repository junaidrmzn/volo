import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { COMMERCIAL_SCHEDULING } from "../../../serviceEndpoints";
import { useDeletePlanSummaries } from "../useDeletePlanSummaries";

const scheduleItemId = "00000000-0000-0000-0000-000000000001";

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will delete a list of plan summary", async () => {
        await provider.addInteraction({
            state: `request to delete schedule item with id ${scheduleItemId}`,
            uponReceiving: "request to delete a list of plan summary",
            withRequest: {
                path: `${COMMERCIAL_SCHEDULING}/commercial-schedule-items`,
                method: "DELETE",
                body: { ids: [{ id: scheduleItemId }] },
            },
            willRespondWith: { status: 204 },
        });

        const { result, waitForNextUpdate } = renderHook(useDeletePlanSummaries, {
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
                data: { ids: [{ id: scheduleItemId }] },
            });
        });

        await waitForNextUpdate();
    });
});
