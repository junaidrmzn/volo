import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllRequirements } from "./useGetAllRequirements";

const { like, eachLike, uuid } = Matchers;

const allRequirementsRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/requirements`,
    method: "GET",
});

const allRequirementsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            title: like("Hover Turn"),
            description: like("The Flight Control System shall provide control for Altitude"),
            passOrFailCriteria: like("Hover Turn"),
        }),
        pagination: {
            totalElements: like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all requirements of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are requirements for definition with id ${definitionId}`,
            uponReceiving: `a request for all requirements of definition with id ${definitionId}`,
            withRequest: allRequirementsRequest(definitionId),
            willRespondWith: allRequirementsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllRequirements({ definitionId }), {
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
            result.current.getAllRequirements();
        });

        await waitForNextUpdate();
    });
});
