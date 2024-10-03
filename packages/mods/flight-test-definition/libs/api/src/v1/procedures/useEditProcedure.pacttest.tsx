import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useEditProcedure } from "./useEditProcedure";

const { like, term } = Matchers;

const editProcedureRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        title: like("Hover Turn"),
    },
});
const editProcedureResponse: ResponseOptions = {
    status: 200,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a procedure with id ${procedureId} exists for definition with id ${definitionId}`,
            uponReceiving: "a request for updating a procedure",
            withRequest: editProcedureRequest(definitionId, procedureId),
            willRespondWith: editProcedureResponse,
        });

        const { result } = renderHook(() => useEditProcedure({ definitionId, procedureId }), {
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

        await actAndGet(() =>
            result.current.editProcedure({
                data: {
                    title: "Hover Turn",
                },
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            })
        );
    });
});
