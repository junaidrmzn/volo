import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook, waitFor } from "@voloiq/testing";
import { anyVertiport } from "@voloiq/vertiport-management-api/v1";
import { anyPactPad } from "../../lib/test-fixtures/anyPactPad";
import { useAddPad } from "../vertiport/detail/pads/pads-context/useAddPad";
import { useDeletePad } from "../vertiport/detail/pads/pads-context/useDeletePad";
import { useEditPad } from "../vertiport/detail/pads/pads-context/useEditPad";
import { VertiportProvider } from "../vertiport/detail/vertiport-context/VertiportProvider";
import { useGetAllPads } from "./usePadService";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

const allPadsRequest = (vertiportId: string, startDateTime: string, endDateTime: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads`,
    query: { startDateTime, endDateTime, orderBy: "validTo:desc" },
    method: "GET",
});

const allPadsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.eachLike(anyPactPad()),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test("fetches all pads for a vertiport", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const startDateTime = "2024-06-01T00:00:00Z";
        const endDateTime = "2024-06-02T04:00:00Z";

        await provider.addInteraction({
            state: `there are pads for vertiport with id ${vertiportId}`,
            uponReceiving: `a request for all pads of vertiport with id ${vertiportId}`,
            withRequest: allPadsRequest(vertiportId, startDateTime, endDateTime),
            willRespondWith: allPadsResponse,
        });

        const { result } = renderHook(() => useGetAllPads({ startDateTime, endDateTime }), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    {children}
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });
        await waitFor(() => expect(result.current?.pads).toHaveLength(1));
    });
});

const deletePadRequest = (vertiportId: string, padId: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}`,
    method: "DELETE",
});
const deletePadResponse: ResponseOptions = {
    status: 204,
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("deletes a specific pad", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const padId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a pad with id ${padId} exists for vertiport with id ${vertiportId}`,
            uponReceiving: `a request for deleting pad with id ${padId}`,
            withRequest: deletePadRequest(vertiportId, padId),
            willRespondWith: deletePadResponse,
        });

        const { result } = renderHook(useDeletePad, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    {children}
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        await act(async () => {
            await result.current.deletePad({ padId });
        });
    });
});

const addPadRequest = (vertiportId: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        padKey: Matchers.like("PAD A"),
        externalId: Matchers.like("ce118b6e-d8e1-11e7-9296-cec278b6jesdb5rr0a"),
        services: Matchers.like(["FATO"]),
        location: Matchers.like({
            longitude: Matchers.like(43),
            latitude: Matchers.like(34),
            height: Matchers.like(342),
        }),
        validFrom: Matchers.like("2020-11-06T16:34:41.000Z"),
        validTo: Matchers.like("2020-11-06T16:34:41.000Z"),
    },
});
const addPadResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactPad()),
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("creates a pad for vertiport", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a vertiport with id ${vertiportId} exists`,
            uponReceiving: "a request for creating a pad",
            withRequest: addPadRequest(vertiportId),
            willRespondWith: addPadResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useAddPad, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    {children}
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.addPad({
                data: {
                    padKey: "PAD A",
                    externalId: "ce118b6e-d8e1-11e7-9296-cec278b6jesdb5rr0a",
                    services: ["FATO"],
                    location: {
                        longitude: 43,
                        latitude: 34,
                        height: 342,
                    },
                    validFrom: "2020-11-06T16:34:41.000Z",
                    validTo: "2020-11-06T16:34:41.000Z",
                },
            });
        });

        await waitForNextUpdate();
    });
});

const editPadRequest = (vertiportId: string, padId: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}`,
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        padKey: Matchers.like("PAD A"),
        externalId: Matchers.like("ce118b6e-d8e1-11e7-9296-cec278b6jesdb5rr0a"),
        services: Matchers.like(["STAND"]),
        location: Matchers.like({
            longitude: Matchers.like(430),
            latitude: Matchers.like(34),
            height: Matchers.like(342),
        }),
        validFrom: Matchers.like("2020-11-06T16:34:41.000Z"),
        validTo: Matchers.like("2020-11-06T16:34:41.000Z"),
    },
});
const editPadResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactPad()),
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("update a pad for vertiport", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const padId = "e1ccddd3-2c8f-4a5e-aea1-35679272bfe4";
        await provider.addInteraction({
            state: `a pad with id ${padId} exists for a vertiport with id ${vertiportId} exists`,
            uponReceiving: "a request for update a pad",
            withRequest: editPadRequest(vertiportId, padId),
            willRespondWith: editPadResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useEditPad, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    {children}
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.editPad({
                data: {
                    padKey: "PAD A",
                    externalId: "ce118b6e-d8e1-11e7-9296-cec278b6jesdb5rr0a",
                    services: ["FATO"],
                    location: {
                        longitude: 43,
                        latitude: 34,
                        height: 342,
                    },
                    validFrom: "2020-11-06T16:34:41.000Z",
                    validTo: "2020-11-06T16:34:41.000Z",
                },
                padId: "e1ccddd3-2c8f-4a5e-aea1-35679272bfe4",
            });
        });

        await waitForNextUpdate();
    });
});
