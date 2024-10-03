import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { anyCancellationCode } from "./anyCancellationCode";
import { useGetAllCancellationCodes } from "./useGetAllCancellationCodes";

const { like } = Matchers;

const getCancellationCodesRequest = (): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/cancellation-codes`,
    method: "GET",
});

const getCancellationCodesResponse = (): ResponseOptions => ({
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: like({
        data: [anyCancellationCode()],
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("fetches cancellation codes", async () => {
        await provider.addInteraction({
            state: "cancellation codes exists",
            uponReceiving: "a request to fetch cancellation codes",
            withRequest: getCancellationCodesRequest(),
            willRespondWith: getCancellationCodesResponse(),
        });

        const { waitForNextUpdate } = renderHook(() => useGetAllCancellationCodes(), {
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
