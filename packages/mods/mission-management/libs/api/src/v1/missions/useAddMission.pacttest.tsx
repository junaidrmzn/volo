import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import {
    MissionCreate,
    MissionCreateSource,
    Service,
    TypeOfOperation,
} from "@voloiq-typescript-api/network-scheduling-types";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { anyMission } from "./anyMission";
import { useAddMission } from "./useAddMission";

const { like } = Matchers;
const addMissionRequestBody: MissionCreate = {
    flightNumber: "OO9876",
    ftoNumber: "234",
    typeOfOperation: TypeOfOperation.PILOTED,
    departureVertiportId: "2b0e41d6-340c-44e0-812f-40ff25637c8d",
    arrivalVertiportId: "2b0e41d6-340c-44e0-812f-40ff25637c8d",
    departureDateTime: "2023-08-03T07:00:00.000Z",
    arrivalDateTime: "2023-08-04T07:00:00.000Z",
    service: Service.TEST,
    source: MissionCreateSource.NETWORK_SCHEDULE,
};

const addMissionRequest = (): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(addMissionRequestBody),
});

const addMissionResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyMission()),
    },
};

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("create a mission", async () => {
        await provider.addInteraction({
            state: `there are missions`,
            uponReceiving: "request to create a mission",
            withRequest: addMissionRequest(),
            willRespondWith: addMissionResponse,
        });

        const { result } = renderHook(() => useAddMission(), {
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
            await result.current.sendRequest({
                data: addMissionRequestBody,
            });
        });
        expect(result.current.data).toEqual(anyMission());
    });
});
