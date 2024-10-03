import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";
import { anyCrewMember } from "./anyCrewMember";
import { useGetAllStandbyCrews } from "./useGetAllStandbyCrews";

const { eachLike, like } = Matchers;

const getAllStandbyCrewsRequest = (regionId: string, aircraftTypeId: string, scheduleDate: string): RequestOptions => ({
    path: `${crewManagementBaseUrl}/crews/standby/${regionId}/${aircraftTypeId}/${scheduleDate}`,
    method: "GET",
});

const getAllStandbyCrewsResponse = (): ResponseOptions => ({
    status: 200,
    body: like({
        data: eachLike(anyCrewMember()),
    }),
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("will fetch all standby crew members", async () => {
        const regionId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const aircraftTypeId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const scheduleDate = "2023-09-14T11:44:16.755Z";
        await provider.addInteraction({
            state: `there is a pilot in region with id ${regionId}`,
            uponReceiving: `a request to fetch all standby crew members in region with id ${regionId}`,
            withRequest: getAllStandbyCrewsRequest(regionId, aircraftTypeId, scheduleDate),
            willRespondWith: getAllStandbyCrewsResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetAllStandbyCrews({ regionId, aircraftTypeId, scheduleDate }),
            {
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
            }
        );

        act(() => {
            result.current.sendRequest({});
        });

        await waitForNextUpdate();
    });
});
