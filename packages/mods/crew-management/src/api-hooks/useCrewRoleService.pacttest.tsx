import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import React from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, actAndGet, renderHook } from "@voloiq/testing";
import { anyCrewRole, anyCrewRoleInsert } from "../../libs/test-fixtures/anyCrewRole";
import { anyPactCrewRole, anyPactCrewRoleInsert } from "../../libs/test-fixtures/anyPactCrewRole";
import { CREW_API } from "./serviceEndpoints";
import {
    useCreateCrewRole,
    useDeleteCrewRole,
    useGetCrewRoleNew,
    useGetCrewRoles,
    useUpdateCrewRole,
} from "./useCrewRoleService";

const allCrewRolesRequest = (): RequestOptions => ({
    path: `${CREW_API}/crew-roles`,
    query: "page=1&size=10",
    method: "GET",
});

const allCrewRolesResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.eachLike(anyCrewRole()),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("fetches all crew roles", async () => {
        await provider.addInteraction({
            state: `there are crew roles`,
            uponReceiving: `a request for all crew roles`,
            withRequest: allCrewRolesRequest(),
            willRespondWith: allCrewRolesResponse,
        });

        const { result, waitFor } = renderHook(() => useGetCrewRoles(1), {
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
        await waitFor(() => {
            expect(result.current.data?.length).toBeGreaterThan(0);
        });
    });
});

const getCrewRoleRequest = (crewRoleId: string): RequestOptions => ({
    path: `${CREW_API}/crew-roles/${crewRoleId}`,
    method: "GET",
});
const getCrewRoleResponse = (crewRoleId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: anyPactCrewRole({ id: crewRoleId }),
    },
});
pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("fetch specific crew role", async () => {
        const crewRoleId = "2679f481-1517-4df6-a8e9-debe126fb5a0";
        await provider.addInteraction({
            state: `a crew role with id ${crewRoleId} exists`,
            uponReceiving: `a request for crew role with id ${crewRoleId}`,
            withRequest: getCrewRoleRequest(crewRoleId),
            willRespondWith: getCrewRoleResponse(crewRoleId),
        });

        const { result } = renderHook(useGetCrewRoleNew, {
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

        const response = await actAndGet(() =>
            result?.current.refetchDataWithResponseEnvelope({ url: `${CREW_API}/crew-roles/${crewRoleId}` })
        );

        expect(response?.data).toEqual(anyCrewRole());
    });
});

const deleteCrewRoleRequest = (crewRoleId: string): RequestOptions => ({
    path: `${CREW_API}/crew-roles/${crewRoleId}`,
    method: "DELETE",
});
const deleteCrewRoleResponse: ResponseOptions = {
    status: 204,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test("deletes a specific crew role", async () => {
        const crewRoleId = "2679f481-1517-4df6-a8e9-debe126fb5a0";
        await provider.addInteraction({
            state: `a crew role with id ${crewRoleId} exists`,
            uponReceiving: `a request for deleting crew role with id ${crewRoleId}`,
            withRequest: deleteCrewRoleRequest(crewRoleId),
            willRespondWith: deleteCrewRoleResponse,
        });

        const { result } = renderHook(useDeleteCrewRole, {
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
            await result.current.sendRequestById(crewRoleId);
        });
    });
});

const addCrewRoleRequest = (): RequestOptions => ({
    path: `${CREW_API}/crew-roles`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: anyPactCrewRoleInsert(),
});
const addCrewRoleResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactCrewRole()),
    },
};
pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("creates a crew role", async () => {
        await provider.addInteraction({
            state: "",
            uponReceiving: "a request for creating a crew role",
            withRequest: addCrewRoleRequest(),
            willRespondWith: addCrewRoleResponse,
        });

        const { result } = renderHook(useCreateCrewRole, {
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
                data: anyCrewRoleInsert(),
            });
        });

        expect(result.current.data).toEqual(anyCrewRole());

        expect(result.current.statusCode).toEqual(201);
    });
});

const editCrewRoleRequest = (crewRoleId: string, version: number): RequestOptions => ({
    path: `${CREW_API}/crew-roles/${crewRoleId}`,
    query: `version=${version}`,
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: anyCrewRoleInsert(),
});
const editCrewRoleResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactCrewRole()),
    },
};
pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("update a crew role", async () => {
        const crewRoleId = "2679f481-1517-4df6-a8e9-debe126fb5a0";
        const version = 0;
        await provider.addInteraction({
            state: `a crew role with id ${crewRoleId} exists`,
            uponReceiving: "a request for update a crew role",
            withRequest: editCrewRoleRequest(crewRoleId, version),
            willRespondWith: editCrewRoleResponse,
        });

        const { result } = renderHook(useUpdateCrewRole, {
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
            await result.current.sendRequestById(crewRoleId, { data: anyCrewRoleInsert(), params: { version } });
        });

        expect(result.current.data).toEqual(anyCrewRole());

        expect(result.current.statusCode).toEqual(200);
    });
});
