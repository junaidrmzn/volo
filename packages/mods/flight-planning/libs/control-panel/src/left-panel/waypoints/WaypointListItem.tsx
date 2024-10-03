import { HStack, Icon, IconButton, ListIcon, Text } from "@volocopter/design-library-react";
import { EditWaypoint } from "./EditWaypoint";
import { useWaypointItem } from "./hooks/useWaypointItem";
import { useWaypointsTranslation } from "./translations";
import { formatTtoFromSeconds } from "./utils/formatTtoFromSeconds";
import { getWaypointName } from "./utils/getWaypointName";

export type WaypointListItemProps = {
    item: Waypoint;
    distanceTillYet: number;
};

export const WaypointListItem = (props: WaypointListItemProps) => {
    const { item, distanceTillYet } = props;
    const waypointName = getWaypointName(item);
    const iconSize = 3.5;
    const { t } = useWaypointsTranslation();

    const { selectedWaypoint, onWaypointSelect, onWaypointDeselect } = useWaypointItem();

    return (
        <HStack w="330px" bg="bgContentLayer" py="1px">
            {item.isVertiport ? (
                <ListIcon as={() => <Icon icon="voloport" size={iconSize} />} cursor="not-allowed" />
            ) : (
                <ListIcon as={() => <Icon icon="bars" size={iconSize} />} cursor="grab" />
            )}
            <Text fontSize="sm" textAlign="left" width="45%">
                {waypointName}
            </Text>
            <Text fontSize="sm" textAlign="right">{`${distanceTillYet.toFixed(2)} NM`}</Text>
            <Text fontSize="sm" textAlign="right">{`+${formatTtoFromSeconds(item.targetTimeOver)}`}</Text>
            <IconButton minWidth="5px" variant="ghost" aria-label={t("edit")} onClick={() => onWaypointSelect(item)}>
                <Icon icon="penWithBox" size={iconSize} />
            </IconButton>
            {selectedWaypoint && <EditWaypoint waypoint={selectedWaypoint} onClose={onWaypointDeselect} />}
            <IconButton minWidth="5px" variant="ghost" aria-label={t("delete")} onClick={() => onWaypointSelect(item)}>
                <Icon icon="trash" size={iconSize} />
            </IconButton>
        </HStack>
    );
};
