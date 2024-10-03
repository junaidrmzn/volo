import { useToast } from "@volocopter/design-library-react";
import type { FlightPlanConflictStatus, FlightPlanStage } from "@voloiq-typescript-api/flight-planning-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { websocketJoinGroup, websocketNegotiate } from "../../../api-hooks";

type AzureWebsocketBase = {
    type: "system" | "message";
};

type AzureWebsocketType = AzureWebsocketBase & {
    event: string;
    userId: string;
    connectionId: string;
};

type AzureWebsocketTypeData = AzureWebsocketBase & {
    from: "group";
    fromUserId: string;
    group: string;
    dataType: "json";
    data: WebsocketPing;
};

type WebsocketPing = {
    flightPlanId: number;
    flightName: string;
    planStage: FlightPlanStage;
    conflictStatus: FlightPlanConflictStatus;
};

/**
 * Hook to connect to a Websocket
 * connects automatically and returns a onMessage handler function to subscribe to messages.
 */
export const useWebsockets = (groupName: string) => {
    const toast = useToast();
    const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined);
    const [groupJoined, setGroupJoined] = useState(false);

    // on mount negotiate websocket url
    useEffect(() => {
        websocketNegotiate().then((data) => {
            if (data?.url) {
                setTokenUrl(data.url);
            }
        });
    }, []);

    // create websocket connection when url is set
    const websocket = useMemo(() => {
        if (!tokenUrl) return undefined;
        return new WebSocket(tokenUrl, "json.webpubsub.azure.v1");
    }, [tokenUrl]);

    // close websocket connection on unmount
    useEffect(() => {
        if (websocket) return () => websocket.close();
        return () => {};
    }, [websocket]);

    useEffect(() => {
        if (!websocket) return;
        websocket.addEventListener("error", () =>
            toast({
                title: "Error",
                description: "websocket error",
                status: "error",
            })
        );

        // join to websocket group after first connect when connectionId is given
        websocket.addEventListener("message", (event: MessageEvent<string>) => {
            if (!event.data) return;
            const { connectionId } = JSON.parse(event.data) as AzureWebsocketType;
            if (connectionId && !groupJoined) {
                websocketJoinGroup({
                    groupId: groupName,
                    connectionId,
                }).then(() => setGroupJoined(true));
            }
        });

        // TODO: reconnect websocket
        // websocket.addEventListener("close", () => {
        //     console.log("websocket closed");
        //     if(websocket.readyState == WebSocket.CLOSED) websocket
        // });
    }, [toast, websocket, groupJoined, groupName]);

    const onMessage = useCallback(
        (callback: (data: AzureWebsocketTypeData) => void) => {
            if (!websocket) return;
            websocket.addEventListener("message", (event: MessageEvent<string>) => {
                const message = JSON.parse(event.data) as AzureWebsocketTypeData;
                if (message.type !== "message") return;
                callback(message);
            });
        },
        [websocket]
    );

    return {
        onMessage,
        groupJoined,
    };
};
