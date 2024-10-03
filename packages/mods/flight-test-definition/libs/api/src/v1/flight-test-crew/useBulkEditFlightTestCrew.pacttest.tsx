import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditFlightTestCrew } from "./useBulkEditFlightTestCrew";

const { term, eachLike } = Matchers;

const editFlightTestCrewRequest = (flightTestOrderId: string, flightTestCrewId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/crew`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/crew",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: flightTestCrewId,
        name: "John Doe",
        role: "Pilot in Command",
        category: "Cat. 1",
        position: "TM",
    }),
});
const editFlightTestCrewResponse: ResponseOptions = {
    status: 200,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates one or more flight test crew members", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const flightTestCrewId = "f5560e04-ed65-48ac-93dd-410fc95271b4";

        await provider.addInteraction({
            state: `some flight test crew members with ids [${flightTestCrewId}] exist for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: "a request for updating one or more flight test crew members",
            withRequest: editFlightTestCrewRequest(flightTestOrderId, flightTestCrewId),
            willRespondWith: editFlightTestCrewResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditFlightTestCrew({ flightTestOrderId }), {
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
            result.current.bulkEditFlightTestCrew({
                data: [
                    {
                        id: flightTestCrewId,
                        name: "John Doe",
                        role: "Pilot in Command",
                        category: "Cat. 1",
                        position: "TM",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
