import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import type { FlightTestOrderPatch } from "./apiModels";
import { useEditFlightTestOrder } from "./useEditFlightTestOrder";

const { like, term } = Matchers;
const someDate = new Date("2024-04-01T00:00:00Z");

const patchFlightTestOrderRequestBody: FlightTestOrderPatch = {
    flightTestCategory: "Cat. 1",
    riskLevel: "HIGH",
    missionScenarios: "Foo",
    missionObjective: "Foo",
    flightTestPlanIds: [],
    aircraftCallsign: "Foo",
    responsibleOperator: "Foo",
    model: "Foo",
    flightConditions: "Foo",
    revision: "Foo",
    issueDateForFlightConditions: someDate.toISOString(),
    permitToFly: "Foo",
    issueDateForPermit: someDate.toISOString(),
    expiredDateForPermit: someDate.toISOString(),
    category: "1",
    testConductor: "Foo",
    secondPilot: "Foo",
    firstObserver: "Foo",
    secondObserver: "Foo",
    maxTestAlt: 1,
    maxTestSpeed: 1,
    vne: 1,
    maxRoll: 1,
    maxPitch: 1,
    weatherLimits: "Foo",
    weatherObserved: "Foo",
    frequencyOps: 1,
    frequencyTwr: 1,
    frequencyApp: 1,
    airspaceRequested: "Foo",
    clearance: "Foo",
};

const editFlightTestOrderRequest = (flightTestOrderId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(patchFlightTestOrderRequestBody),
});
const allFlightTestOrdersResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a flight test order", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a flight test order with id ${flightTestOrderId} exists`,
            uponReceiving: "a request for updating a flight test order",
            withRequest: editFlightTestOrderRequest(flightTestOrderId),
            willRespondWith: allFlightTestOrdersResponse,
        });

        const { result } = renderHook(() => useEditFlightTestOrder(flightTestOrderId), {
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
            result.current.editFlightTestOrder({
                data: patchFlightTestOrderRequestBody,
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            })
        );
    });
});
