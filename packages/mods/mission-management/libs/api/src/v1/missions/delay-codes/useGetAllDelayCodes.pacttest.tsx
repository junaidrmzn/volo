import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { anyDelayCode } from "./anyDelayCode";
import { useGetAllDelayCodes } from "./useGetAllDelayCodes";

const { like } = Matchers;

const getDelayCodesRequest = (): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/delay-codes`,
    method: "GET",
});

const getDelayCodesResponse = (): ResponseOptions => ({
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: like({
        data: [anyDelayCode()],
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("fetches delay codes", async () => {
        await provider.addInteraction({
            state: "delay codes exists",
            uponReceiving: "a request for delay codes",
            withRequest: getDelayCodesRequest(),
            willRespondWith: getDelayCodesResponse(),
        });

        const { waitForNextUpdate } = renderHook(() => useGetAllDelayCodes({ options: { manual: false } }), {
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
