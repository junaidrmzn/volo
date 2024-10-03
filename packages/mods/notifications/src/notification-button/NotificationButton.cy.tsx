import { Center } from "@volocopter/design-library-react";
import { Client, Server, WebSocket } from "mock-socket";
import { useRegisterRouteTemplates } from "@voloiq/notification-provider";
import { anyNotification } from "@voloiq/notifications-api/v1";
import {
    getNegotiateInterceptor,
    getNotificationsInterceptor,
    postNotificationToggleMuteInterceptor,
    postNotificationToggleReadInterceptor,
    postNotificationToggleRemoveInterceptor,
} from "@voloiq/notifications-cypress-interceptors/v1";
import { notifications } from "@voloiq/notifications-cypress-page-objects";
import { Route, Routes } from "@voloiq/routing";
import { RealtimeNotificationProvider } from "../realtime-notification-provider/RealtimeNotificationProvider";
import { NotificationButton } from "./NotificationButton";

describe("Notification Button", () => {
    it("User can read notifications and they don't show up as new after closing and reopening them", () => {
        const notification = anyNotification({
            read: false,
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.buttonCount(1).should("be.visible");
        notifications.button().click();
        notifications.popover.notificationCard.newIndication().should("be.visible");
        getNotificationsInterceptor([
            {
                ...notification,
                read: true,
                readAt: "2022-07-28T14:08:51.607219Z",
            },
        ]);
        notifications.popover.closePopover();
        notifications.buttonCount(1).should("not.exist");
        notifications.button().click();
        notifications.popover.notificationCard.newIndication().should("not.exist");
    });

    it("User can mute a notification and hide it by toggling show muted switch", () => {
        const notification = anyNotification({
            muted: false,
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        postNotificationToggleMuteInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        getNotificationsInterceptor([
            {
                ...notification,
                muted: true,
                mutedAt: "2022-07-28T14:08:51.607219Z",
            },
        ]);
        notifications.popover.notificationCard.muteButton().click();
        notifications.popover.notificationCard.unmuteButton().should("be.visible");

        notifications.popover.showMutedSwitch().click({ force: true });
        notifications.popover.notificationCard.unmuteButton().should("not.exist");

        notifications.popover.showMutedSwitch().click({ force: true });
        notifications.popover.notificationCard.unmuteButton().should("be.visible");
    });

    it("User can delete a readonly info notification", () => {
        const notification = anyNotification({
            severity: "UNKNOWN",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        postNotificationToggleRemoveInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        getNotificationsInterceptor([]);
        notifications.popover.notificationCard.deleteButton().click();
        notifications.popover.noOpenNotificationsIndication().should("be.visible");
    });

    it("User can delete a resolved notification", () => {
        const notification = anyNotification({
            severity: "INFO",
            resolvedBy: "John Doe",
            resolvedAt: "2022-07-28T14:08:51.607219Z",
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        postNotificationToggleRemoveInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        notifications.popover.resolvedTab().click();
        getNotificationsInterceptor([]);
        notifications.popover.notificationCard.deleteButton().click();
        notifications.popover.noResolvedNotificationsIndication().should("be.visible");
    });

    it("User cannot delete an open actionable notification", () => {
        const notification = anyNotification({
            severity: "INFO",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        postNotificationToggleRemoveInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        notifications.popover.notificationCard.deleteButton().should("not.exist");
    });

    it("User can navigate to a linked entity by clicking on the notification's chevron icon", () => {
        const notification = anyNotification({
            entityType: "mission",
            entityUuid: "5cd33d0d-e6f0-49db-9cef-b9011d026c3d",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);

        const MissionModule = () => {
            useRegisterRouteTemplates({
                routeTemplates: [
                    {
                        entityType: "mission",
                        getEntityRoute: (entityId) => `/mission/${entityId}`,
                    },
                ],
            });

            return (
                <Routes>
                    <Route path="/mission/5cd33d0d-e6f0-49db-9cef-b9011d026c3d" element={<>Mission</>} />
                </Routes>
            );
        };

        cy.mount(
            <>
                <MissionModule />
                <Center height="100vh">
                    <NotificationButton />
                </Center>
            </>
        );

        notifications.button().click();
        notifications.popover.notificationCard.navigateToEntityButton("mission").click();
        cy.findByText("Mission").should("be.visible");
    });

    it("User does not see navigate to entity button when no route template is registered", () => {
        const notification = anyNotification({
            entityType: "mission",
            entityUuid: "5cd33d0d-e6f0-49db-9cef-b9011d026c3d",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([notification]);
        postNotificationToggleReadInterceptor(notification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        notifications.popover.notificationCard.navigateToEntityButton("mission").should("not.exist");
    });

    it("User sees newly created and updated notifications in realtime", () => {
        const notification = anyNotification({
            title: "Battery is about to explode",
            sender: "Battery Management",
            severity: "ERROR",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([]);
        postNotificationToggleReadInterceptor(notification.id);
        const webSocketUrl = "ws://cypress-test.io";
        getNegotiateInterceptor({
            url: webSocketUrl,
        });

        const socketPromise = new Cypress.Promise<Client>((resolve) => {
            const mockServer = new Server(webSocketUrl);
            mockServer.on("connection", (socketHandle) => {
                resolve(socketHandle);
            });
        });
        const sendMockSocketMessage = (message: string) =>
            cy.wrap(socketPromise).then((mockSocket) => {
                (mockSocket as Client).send(message);
            });
        cy.stub(window, "WebSocket").callsFake((url) => new WebSocket(url));
        cy.mount(
            <Center height="100vh">
                <RealtimeNotificationProvider>
                    <NotificationButton />
                </RealtimeNotificationProvider>
            </Center>
        );

        notifications.button().click();
        notifications.popover.noOpenNotificationsIndication().should("be.visible");
        sendMockSocketMessage(
            JSON.stringify({
                type: "message",
                data: notification,
            })
        );
        getNotificationsInterceptor([notification]);
        cy.findByText("Battery is about to explode").should("be.visible");
        sendMockSocketMessage(
            JSON.stringify({
                type: "message",
                data: { ...notification, resolvedBy: "John Doe" },
            })
        );
        getNotificationsInterceptor([{ ...notification, resolvedBy: "John Doe" }]);
        notifications.popover.noOpenNotificationsIndication().should("be.visible");
        notifications.toast("John Doe", "Battery Management", "alert");
        notifications.popover.resolvedTab().click();
        cy.findByText("Battery is about to explode").should("be.visible");
    });

    it("User sees most recent notification on top", () => {
        const oldNotification = anyNotification({
            title: "Old Notification",
            createdAt: "2023-11-09T10:00:00.000Z",
            resolvedBy: null,
            resolvedAt: null,
        });
        const newNotification = anyNotification({
            title: "New Notification",
            createdAt: "2023-11-09T12:00:00.000Z",
            resolvedBy: null,
            resolvedAt: null,
        });
        getNotificationsInterceptor([oldNotification, newNotification]);
        postNotificationToggleReadInterceptor(oldNotification.id);
        postNotificationToggleReadInterceptor(newNotification.id);
        cy.mount(
            <Center height="100vh">
                <NotificationButton />
            </Center>
        );

        notifications.button().click();
        cy.findByText("Old Notification").then((oldNotificationElement) => {
            const { top: oldNotificationPositionTop } = oldNotificationElement.position();

            cy.findByText("New Notification").then((newNotificationElement) => {
                const { top: newNotificationPositionTop } = newNotificationElement.position();
                expect(newNotificationPositionTop, "New notification should be over old notification").to.be.lessThan(
                    oldNotificationPositionTop
                );
            });
        });
    });
});
