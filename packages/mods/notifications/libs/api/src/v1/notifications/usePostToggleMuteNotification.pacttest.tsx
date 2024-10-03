import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import type { PostToggleMuteNotificationBody } from "./usePostToggleMuteNotification";
import { usePostToggleMuteNotification } from "./usePostToggleMuteNotification";

const { like } = Matchers;

const postToggleMuteNotificationRequestBody: PostToggleMuteNotificationBody = {
    status: true,
};

const postToggleMuteNotificationRequest = (notificationId: string): RequestOptions => ({
    path: `/notification/v1/notifications/${notificationId}/toggle-mute`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(postToggleMuteNotificationRequestBody),
});

const postToggleMuteNotificationResponse = (): ResponseOptions => ({
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
});

pactWith({ consumer: "voloiq.notification.ui", provider: "voloiq.notification.api" }, (provider) => {
    test("toggles the mute state of a notification", async () => {
        const notificationId = "326fa915-efc5-48ee-ad14-b6f6c25001b8";
        await provider.addInteraction({
            state: `there is a notification with id ${notificationId}`,
            uponReceiving: "a request to mute notification",
            withRequest: postToggleMuteNotificationRequest(notificationId),
            willRespondWith: postToggleMuteNotificationResponse(),
        });

        const { result } = renderHook(() => usePostToggleMuteNotification({ notificationId }), {
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
            await result.current.toggleMute({
                data: postToggleMuteNotificationRequestBody,
            });
        });
    });
});
