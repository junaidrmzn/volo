import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { useGetAllServices } from "./useVertiportServicesService";

const { eachLike, like } = Matchers;

const fetchAllServicesResponse = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
        data: eachLike({
            key: like("PAX"),
            value: like("passenger-handling"),
        }),
    },
};

pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    it("will fetch all services", async () => {
        await provider.addInteraction({
            state: "there are services",
            uponReceiving: "a request for services",
            withRequest: {
                method: "GET",
                path: "/vertiport-management/v1/vertiports/services",
            },
            willRespondWith: fetchAllServicesResponse,
        });

        const { result, waitFor } = renderHook(() => useGetAllServices(), {
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

        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });
    });
});
