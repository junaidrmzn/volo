import { useToast } from "@volocopter/design-library-react";
import type { LngLatLike } from "maplibre-gl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWebPubSubHandshake } from "../../api-hooks";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";

type BirdMonitoringStreamItem = {
    coords: LngLatLike;
    type: string;
};

type BirdMonitoringResponse = {
    event_type: string;
    gps_lng: number;
    gps_lat: number;
};

export const useBirdData = () => {
    const { getBirdMonitoringAccessToken, requestJoinBirdMonitoringGroup, requestLeaveBirdMonitoringGroup } =
        useWebPubSubHandshake();
    const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined);
    const [joinedGroup, setJoinedGroup] = useState<string | undefined>(undefined);
    const [connectionId, setConnectionId] = useState<string | undefined>(undefined);
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();
    const [birdMonitoringData, setBirdMonitoringData] = useState<BirdMonitoringStreamItem[]>([]);

    const getSocketUrl = useCallback(() => {
        return getBirdMonitoringAccessToken().then((response) => {
            if (!response || response.url === tokenUrl) return;
            setTokenUrl(response.url);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getSocketUrl();
    }, [getSocketUrl]);

    const websocket = useMemo(() => {
        if (!tokenUrl) return undefined;
        return new WebSocket(tokenUrl, "json.webpubsub.azure.v1");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenUrl]);

    const listener = useCallback((event: MessageEvent) => {
        const messageConnectionId = JSON.parse(event.data).connectionId;
        if (messageConnectionId && !joinedGroup) {
            setConnectionId(messageConnectionId);
            requestJoinBirdMonitoringGroup({
                connection_id: messageConnectionId,
                group_name: "ana_01",
            }).then(() => setJoinedGroup("ana_01"));
        }
        const { data } = JSON.parse(event.data);
        if (data) {
            const mappedBirdData = data.map((item: BirdMonitoringResponse) => {
                return { coords: [item.gps_lng, item.gps_lat], type: item.event_type };
            });
            setBirdMonitoringData(mappedBirdData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!connectionId || joinedGroup === "ana_01") return;
        requestLeaveBirdMonitoringGroup({
            group_name: joinedGroup || "",
            connection_id: connectionId,
        }).then(() => setJoinedGroup(undefined));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!websocket) return;
        websocket.addEventListener("error", () =>
            toast({
                title: "Error",
                description: t("errors.websocket.error"),
                status: "error",
            })
        );
        websocket.addEventListener("message", listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [websocket]);
    return {
        birdMonitoringData,
    };
};
