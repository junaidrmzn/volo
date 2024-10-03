import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditTestPoints } from "./useBulkEditTestPoints";

const { like, term, eachLike } = Matchers;

const editTestPointRequest = (
    definitionId: string,
    procedureId: string,
    testPointId: string,
    testPointParameterId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/test\\-points",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: testPointId,
        testPointParameters: eachLike({
            id: testPointParameterId,
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
});
const editTestPointResponse: ResponseOptions = {
    status: 200,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-updates test points", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointParameterId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a test point with id ${testPointId} exists for a procedure with id ${procedureId} for definition with id ${definitionId} and a test point parameter with id ${testPointParameterId} exists`,
            uponReceiving: "a request for bulk-updating test points",
            withRequest: editTestPointRequest(definitionId, procedureId, testPointId, testPointParameterId),
            willRespondWith: editTestPointResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditTestPoints({ definitionId, procedureId }), {
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
            result.current.bulkEditTestPoints({
                data: [
                    {
                        id: testPointId,
                        testPointParameters: [
                            {
                                id: testPointParameterId,
                                value: "10",
                            },
                        ],
                        comments: "Risky",
                        isApplicableForAgency: true,
                        isApplicableForBuildUp: false,
                        isApplicableForCertification: true,
                        isApplicableForDevelopment: true,
                        isApplicableForUnassigned: false,
                        applicability: "AGENCY",
                        grossWeight: "100kg",
                        centerOfGravity: "1.0",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
