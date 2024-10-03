import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { PLAN_BASE_URL } from "../../../serviceEndpoints";
import { useUploadSsim } from "../useUploadSsim";

const { like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test.skip("will create a commercial plan", async () => {
        await provider.addInteraction({
            state: "upload ssim file",
            uponReceiving: "request to create a commercial plan",
            withRequest: {
                path: `${PLAN_BASE_URL}/upload-ssim`,
                method: "POST",
                body: null,
            },
            willRespondWith: {
                status: 201,
                body: {
                    data: like({
                        id: "00000000-0000-0000-0000-000000000001",
                        status: "NEW",
                        remarks: null,
                    }),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useUploadSsim, {
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
                data: new FormData(),
                params: { commercialPlanName: "Commercial Plan Name" },
            });
        });

        await waitForNextUpdate();
    });
});
