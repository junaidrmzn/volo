import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { v4 as uuidV4 } from "uuid";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyTipTapJson } from "../../common";
import { useGetAllFlightTestOrders } from "./useGetAllFlightTestOrders";

const { eachLike } = Matchers;

const someDate = new Date("2024-04-01T00:00:00Z");

const allFlightTestOrdersRequest = (): RequestOptions => ({
    path: "/ftd/v2/orders",
    method: "GET",
});

const allFlightTestOrdersResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuidV4(),
            createTime: someDate.toISOString(),
            updateTime: someDate.toISOString(),
            createdBy: "John Doe",
            ftoId: "FTO-V21-2023-002",
            missionTitle: "Flt#53: Aerocover Validation & ADAHRS Phase 3.1",
            masterModel: "VC2-1",
            msn: "MSN 01",
            missionObjective: JSON.stringify(anyTipTapJson("short summary")),
            flightTestPlanIds: [],
            riskLevel: "HIGH",
            flightTestCategory: "Cat. 1",
            testPointCounter: 2,
            testPointSequenceCounter: 1,
            status: "DRAFT",
        }),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all flight test orders", async () => {
        await provider.addInteraction({
            state: "there are flight test orders",
            uponReceiving: "a request for all flight test orders",
            withRequest: allFlightTestOrdersRequest(),
            willRespondWith: allFlightTestOrdersResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(useGetAllFlightTestOrders, {
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
            result.current.getAllFlightTestOrders();
        });

        await waitForNextUpdate();
    });
});
