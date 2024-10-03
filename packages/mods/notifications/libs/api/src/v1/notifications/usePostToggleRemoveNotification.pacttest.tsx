import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import type { PostToggleRemoveNotificationBody } from "./usePostToggleRemoveNotification";
import { usePostToggleRemoveNotification } from "./usePostToggleRemoveNotification";

const { like } = Matchers;

const postToggleRemoveNotificationRequestBody: PostToggleRemoveNotificationBody = {
    status: true,
};

const postToggleRemoveNotificationRequest = (notificationId: string): RequestOptions => ({
    path: `/notification/v1/notifications/${notificationId}/toggle-remove`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(postToggleRemoveNotificationRequestBody),
});

const postToggleRemoveNotificationResponse = (): ResponseOptions => ({
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
});

pactWith({ consumer: "voloiq.notification.ui", provider: "voloiq.notification.api" }, (provider) => {
    test("toggles the remove state of a notification", async () => {
        const notificationId = "326fa915-efc5-48ee-ad14-b6f6c25001b8";
        await provider.addInteraction({
            state: `there is a notification with id ${notificationId}`,
            uponReceiving: "a request to remove notification",
            withRequest: postToggleRemoveNotificationRequest(notificationId),
            willRespondWith: postToggleRemoveNotificationResponse(),
        });

        const { result } = renderHook(() => usePostToggleRemoveNotification({ notificationId }), {
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
            await result.current.toggleRemove({
                data: postToggleRemoveNotificationRequestBody,
            });
        });
    });
});
