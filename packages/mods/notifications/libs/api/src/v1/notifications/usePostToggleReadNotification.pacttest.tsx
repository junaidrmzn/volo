import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import type { PostToggleReadNotificationBody } from "./usePostToggleReadNotification";
import { usePostToggleReadNotification } from "./usePostToggleReadNotification";

const { like } = Matchers;

const postToggleReadNotificationRequestBody: PostToggleReadNotificationBody = {
    status: true,
};

const postToggleReadNotificationRequest = (notificationId: string): RequestOptions => ({
    path: `/notification/v1/notifications/${notificationId}/toggle-read`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(postToggleReadNotificationRequestBody),
});

const postToggleReadNotificationResponse = (): ResponseOptions => ({
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
});

pactWith({ consumer: "voloiq.notification.ui", provider: "voloiq.notification.api" }, (provider) => {
    test("toggles the read state of a notification", async () => {
        const notificationId = "326fa915-efc5-48ee-ad14-b6f6c25001b8";
        await provider.addInteraction({
            state: `there is a notification with id ${notificationId}`,
            uponReceiving: "a request to read notification",
            withRequest: postToggleReadNotificationRequest(notificationId),
            willRespondWith: postToggleReadNotificationResponse(),
        });

        const { result } = renderHook(() => usePostToggleReadNotification({ notificationId }), {
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
            await result.current.toggleRead({
                data: postToggleReadNotificationRequestBody,
            });
        });
    });
});
