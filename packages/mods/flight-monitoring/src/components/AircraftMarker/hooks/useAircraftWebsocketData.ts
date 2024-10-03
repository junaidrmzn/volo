import * as turf from "@turf/turf";
import { useToast } from "@volocopter/design-library-react";
import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import type { LngLatLike } from "maplibre-gl";
import { useCallback, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { useRequestFlightPath, useWebPubSubHandshake } from "../../../api-hooks";
import { useFlightMonitoringTranslation } from "../../../translations/useFlightMonitoringTranslation";

export const useAircraftWebsocketData = (selectedAircraftId: string | null) => {
    const { t } = useFlightMonitoringTranslation();
    const toast = useToast();
    const { getWebpubsubAccessToken, requestJoinGroup, requestLeaveGroup } = useWebPubSubHandshake();
    const { requestFlightPathOfActiveVtol } = useRequestFlightPath();
    const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined);

    // add distance attribute to message. needed for vertical profile.
    const [flightPathTelemetryData, setflightPathTelemetryData] = useState<(FlightPathItem & { distance: number })[]>(
        []
    );
    const [joinedGroup, setJoinedGroup] = useState<string | undefined>(undefined);
    const [connectionId, setConnectionId] = useState<string | undefined>(undefined);

    const getSocketUrl = useCallback(() => {
        if (!selectedAircraftId) return undefined;
        return getWebpubsubAccessToken().then((response) => {
            if (!response || response.url === tokenUrl) return;
            setTokenUrl(response.url);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAircraftId]);

    useEffect(() => {
        getSocketUrl();
    }, [getSocketUrl]);

    const websocket = useMemo(() => {
        if (!tokenUrl) return undefined;
        return new WebSocket(tokenUrl, "json.webpubsub.azure.v1");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenUrl, selectedAircraftId]);

    const listener = useCallback(
        (event: MessageEvent) => {
            if (!selectedAircraftId) return;
            const messageConnectionId = JSON.parse(event.data).connectionId;
            if (messageConnectionId && !joinedGroup) {
                setConnectionId(messageConnectionId);
                requestJoinGroup({ connection_id: messageConnectionId, group_name: selectedAircraftId }).then(() =>
                    setJoinedGroup(selectedAircraftId)
                );
                requestFlightPathOfActiveVtol(selectedAircraftId).then((response) => {
                    setflightPathTelemetryData(
                        // eslint-disable-next-line unicorn/no-array-reduce
                        response.reduce(
                            (accumulator: (FlightPathItem & { distance: number })[], current: FlightPathItem) =>
                                accumulator.length > 0
                                    ? [
                                          ...accumulator,
                                          {
                                              ...current,
                                              distance:
                                                  accumulator[accumulator.length - 1]!.distance +
                                                  turf.distance(
                                                      [
                                                          accumulator[accumulator.length - 1]!.lng!,
                                                          accumulator[accumulator.length - 1]!.lat!,
                                                      ],
                                                      [current.lng!, current.lat!],
                                                      { units: "nauticalmiles" }
                                                  ),
                                          },
                                      ]
                                    : [
                                          {
                                              ...current,
                                              distance: 0,
                                          },
                                      ],
                            []
                        )
                    );
                });
            }
            const { data } = JSON.parse(event.data);
            if (data && data.vtolId === selectedAircraftId) {
                setflightPathTelemetryData((messages) => [
                    ...messages,
                    {
                        ...data,
                        distance:
                            messages[messages.length - 1]?.distance! +
                            turf.distance(
                                [data.lng, data.lat],
                                [messages[messages.length - 1]?.lng!, messages[messages.length - 1]?.lat!]
                            ),
                    },
                ]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedAircraftId]
    );

    useEffect(() => {
        if (!connectionId || joinedGroup === selectedAircraftId) return;
        requestLeaveGroup({
            group_name: joinedGroup || selectedAircraftId || "",
            connection_id: connectionId,
        }).then(() => setJoinedGroup(undefined));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAircraftId]);

    useEffect(() => {
        if (!websocket || !selectedAircraftId) return;
        websocket.addEventListener("error", () =>
            toast({
                title: "Error",
                description: t("errors.websocket.error"),
                status: "error",
            })
        );
        // Listen for messages

        websocket.addEventListener("message", listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [websocket, selectedAircraftId]);

    const getCurrentPosition = useCallback((): LngLatLike => {
        const lastMessage = flightPathTelemetryData
            ? flightPathTelemetryData[flightPathTelemetryData.length - 1]
            : null;
        return lastMessage && lastMessage.lng && lastMessage.lat ? [lastMessage.lng, lastMessage.lat] : [0, 0];
    }, [flightPathTelemetryData]);

    return {
        flightPathTelemetryData,
        getCurrentPosition,
    };
};
