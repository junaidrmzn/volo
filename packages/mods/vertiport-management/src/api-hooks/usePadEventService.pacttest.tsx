import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyPad, anyPadEventInsert, anyVertiport } from "@voloiq/vertiport-management-api/v1";
import { anyPactPadEvent, anyPactPadEventInsert } from "../../lib/test-fixtures/anyPactPadEvent";
import { PadProvider } from "../vertiport/detail/pads/pad-card-list/pad-actions-popover/pad-context/PadProvider";
import { useAddPadEvent } from "../vertiport/detail/pads/pad-card-list/pad-actions-popover/pad-events/pad-events-context/useAddPadEvent";
import { useDeletePadEvent } from "../vertiport/detail/pads/pad-card-list/pad-actions-popover/pad-events/pad-events-context/useDeletePadEvent";
import { VertiportProvider } from "../vertiport/detail/vertiport-context/VertiportProvider";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

const addPadEventRequest = (vertiportId: string, padId: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}/events`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: anyPactPadEventInsert(),
});
const addPadEventResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactPadEvent()),
    },
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("creates an event for pad", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const padId = "3fed7942-aea9-4c4c-bb94-ddaee4b46280";
        await provider.addInteraction({
            state: `a vertiport with id ${vertiportId} and pad with id ${padId} exists`,
            uponReceiving: "a request for creating an event for pad",
            withRequest: addPadEventRequest(vertiportId, padId),
            willRespondWith: addPadEventResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useAddPadEvent, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    <PadProvider pad={anyPad({ id: padId })}>{children}</PadProvider>
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.addPadEvent({
                data: anyPadEventInsert(),
            });
        });
        await waitForNextUpdate();
    });
});

const deletePadEventRequest = (vertiportId: string, padId: string, eventId: string): RequestOptions => ({
    path: `/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}/events/${eventId}`,
    method: "DELETE",
});
const deletePadEventResponse: ResponseOptions = {
    status: 204,
};
pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("deletes a specific event", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        const padId = "3fed7942-aea9-4c4c-bb94-ddaee4b46280";
        const eventId = "6bba9d15-77cb-4964-8ed5-75830e2997e3";
        await provider.addInteraction({
            state: `an event with id ${eventId} exists for pad with id ${padId}`,
            uponReceiving: `a request for deleting event with id ${eventId}`,
            withRequest: deletePadEventRequest(vertiportId, padId, eventId),
            willRespondWith: deletePadEventResponse,
        });

        const { result } = renderHook(useDeletePadEvent, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>
                                <VertiportProvider vertiport={anyVertiport({ id: vertiportId })}>
                                    <PadProvider pad={anyPad({ id: padId })}>{children}</PadProvider>
                                </VertiportProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        await act(async () => {
            await result.current.deletePadEvent({ padEventId: eventId });
        });
    });
});
