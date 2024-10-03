import { useToast } from "@volocopter/design-library-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useFlightPlanningTranslation } from "../../../translations";
import { useWebsockets } from "./useWebsocket";

export const useFlightPlanOverview = () => {
    const [selectedId, setSelectedId] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const { onMessage, groupJoined } = useWebsockets("flightplan-overview");
    const queryClient = useQueryClient();
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();

    useEffect(() => {
        if (!groupJoined || subscribed) return;
        onMessage((data) => {
            if (data.data) {
                setTimeout(() => queryClient.invalidateQueries(["flight-plans"]), 500);

                if (data.data.planStage === "deconfliction" && data.data.conflictStatus === "conflicting") {
                    toast({
                        title: data.data.flightName
                            ? `${data.data.flightName} - CONFLICT`
                            : t("flightPlanManagement.flightPlanUpdate"),
                        description: t("flightPlanManagement.resolveConflict"),
                        status: "error",
                        duration: 20_000,
                    });
                } else {
                    toast({
                        title: data.data.flightName
                            ? `${data.data.flightName} - ${t("flightPlanManagement.flightPlanUpdate")}`
                            : t("flightPlanManagement.flightPlanUpdate"),
                        description: t("flightPlanManagement.receivedFlightPlanStatusUpdate"),
                        status: "info",
                    });
                }
            }
        });
        setSubscribed(true);
    }, [groupJoined, onMessage, queryClient, toast, t, subscribed]);

    useEffect(() => {
        setIsOpen(selectedId !== undefined);
    }, [selectedId]);

    return {
        selectedId,
        setSelectedId,
        isOpen,
        setIsOpen,
    };
};
