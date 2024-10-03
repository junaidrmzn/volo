import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllTestPoints } from "./useGetAllTestPoints";

const { eachLike, uuid, like, term } = Matchers;

const allTestPointsRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/test\\-points.*",
    }),
    method: "GET",
});

const allTestPointsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            testPointParameters: eachLike({
                id: uuid(),
                name: like("Gross Weight"),
                value: like("10"),
            }),
            comments: like("Risky"),
            isApplicableForAgency: like(true),
            isApplicableForBuildUp: like(false),
            isApplicableForCertification: like(true),
            isApplicableForDevelopment: like(true),
            isApplicableForUnassigned: like(false),
            applicability: like("AGENCY"),
            grossWeight: like("100kg"),
            centerOfGravity: like("1.0"),
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test points of a procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are test points for a procedure with id ${procedureId} for a definition with id ${definitionId}`,
            uponReceiving: `a request for every test point of procedure with id ${procedureId} of the definition with id ${definitionId}`,
            withRequest: allTestPointsRequest(definitionId, procedureId),
            willRespondWith: allTestPointsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllTestPoints({ definitionId, procedureId }), {
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
            result.current.getAllTestPoints();
        });

        await waitForNextUpdate();
    });
});
