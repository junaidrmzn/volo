import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllWindchillRequirements } from "./useGetAllWindchillRequirements";

const { like, eachLike, uuid } = Matchers;

const allWindchillRequirementsRequest = (): RequestOptions => ({
    path: `/ftd/v1/windchill-requirements`,
    method: "GET",
});

const allWindchillRequirementsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            windchillId: like("123456"),
            documentId: like("654321"),
            text: like("The Flight Control System shall provide control for Altitude"),
        }),
        pagination: {
            totalElements: like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all windchill requirements of a definition", async () => {
        await provider.addInteraction({
            state: `there are windchill requirements`,
            uponReceiving: `a request for all windchill requirements`,
            withRequest: allWindchillRequirementsRequest(),
            willRespondWith: allWindchillRequirementsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllWindchillRequirements({}), {
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
            result.current.getAllWindchillRequirements();
        });

        await waitForNextUpdate();
    });
});
