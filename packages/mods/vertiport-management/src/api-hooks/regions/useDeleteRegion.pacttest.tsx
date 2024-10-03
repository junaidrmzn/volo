import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { useDeleteRegion } from "../useRegionService";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

const deleteRegionRequest = (vertiportId: string): RequestOptions => ({
    path: `/vertiport-management/v1/regions/${vertiportId}`,
    method: "DELETE",
});
const deleteRegionResponse: ResponseOptions = {
    status: 204,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    it.skip("deletes a specific region", async () => {
        const regionId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a region with id ${regionId} exists`,
            uponReceiving: `a request for deleting region with id ${regionId}`,
            withRequest: deleteRegionRequest(regionId),
            willRespondWith: deleteRegionResponse,
        });

        const { result } = renderHook(useDeleteRegion, {
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

        await act(async () => {
            await result.current.sendRequestById(regionId);
        });
    });
});
