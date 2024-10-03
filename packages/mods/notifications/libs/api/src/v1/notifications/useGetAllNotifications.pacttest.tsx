import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyNotification } from "./anyNotification";
import { useGetAllNotifications } from "./useGetAllNotifications";

const { like } = Matchers;

const allNotificationsRequest = (): RequestOptions => ({
    path: "/notification/v1/notifications",
    method: "GET",
});

const allNotificationsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyNotification()],
    }),
});

pactWith({ consumer: "voloiq.notification.ui", provider: "voloiq.notification.api" }, (provider) => {
    test("fetches all notifications", async () => {
        await provider.addInteraction({
            state: "there are notifications",
            uponReceiving: "a request for all notifications",
            withRequest: allNotificationsRequest(),
            willRespondWith: allNotificationsResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(useGetAllNotifications, {
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
            result.current.getAllNotifications();
        });

        await waitForNextUpdate();
    });
});
