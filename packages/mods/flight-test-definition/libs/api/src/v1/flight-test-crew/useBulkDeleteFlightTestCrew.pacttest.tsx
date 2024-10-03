import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteFlightTestCrew } from "./useBulkDeleteFlightTestCrew";

const { term } = Matchers;

const deleteFlightTestCrewRequest = (flightTestOrderId: string, flightTestCrewId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/crew`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/crew",
    }),
    method: "DELETE",
    body: [flightTestCrewId],
});
const deleteFlightTestCrewResponse: ResponseOptions = {
    status: 204,
};

// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
// TODO: if problem above is solved, make sure test works with new back-end implementation before unskipping it.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("deletes one or more specific flight test crew members", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const flightTestCrewId = "f5560e04-ed65-48ac-93dd-410fc95271b4";
        await provider.addInteraction({
            state: `some flight test crew members with ids [${flightTestCrewId}] exist for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: `a request for deleting flight test crew members with ids [${flightTestCrewId}]`,
            withRequest: deleteFlightTestCrewRequest(flightTestOrderId, flightTestCrewId),
            willRespondWith: deleteFlightTestCrewResponse,
        });

        const { result } = renderHook(() => useBulkDeleteFlightTestCrew({ flightTestOrderId }), {
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
            await result.current.bulkDeleteFlightTestCrew({
                data: [flightTestCrewId],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });
    });
});
