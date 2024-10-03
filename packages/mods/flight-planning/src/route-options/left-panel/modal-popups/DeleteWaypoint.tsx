import { Text } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { FloatingModal } from "../generic/FloatingModal";
import { useWaypointsTranslation } from "../waypoints/translations";

type DeleteWaypointProps = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    selectedWaypoint?: Waypoint | null;
};

export const DeleteWaypoint = (props: DeleteWaypointProps) => {
    const { isOpen, onClose, selectedWaypoint } = props;
    const { t } = useWaypointsTranslation();

    return (
        <FloatingModal
            isOpen={isOpen}
            onClose={() => onClose(false)}
            size="sm"
            title={t("delete")}
            subTitle={selectedWaypoint?.name}
            saveTitle={t("confirm")}
            cancelTitle={t("cancel")}
            hasFooter
        >
            <Text>{t("deleteMessage")}</Text>
        </FloatingModal>
    );
};
