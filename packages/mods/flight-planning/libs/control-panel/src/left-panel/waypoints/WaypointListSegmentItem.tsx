import { HStack, Icon, IconButton, Text, useColorModeValue } from "@volocopter/design-library-react";
import { useWaypointsTranslation } from "./translations";
import { formatTtoFromSecondsWithLiterals } from "./utils/formatTtoFromSeconds";
import { getWaypointName } from "./utils/getWaypointName";

export type WaypointListSegmentItemProps = {
    waypoint: Waypoint;
    nextWaypoint: Waypoint;
};

export const WaypointListSegmentItem = (props: WaypointListSegmentItemProps) => {
    const { waypoint, nextWaypoint } = props;
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const { t } = useWaypointsTranslation();

    return (
        <HStack left={0} w="330px" px={1} py="1px" bgColor={bgColor}>
            <Text fontSize="sm" textAlign="left" width="50%" marginLeft="20px">
                {getWaypointName(waypoint)} - {getWaypointName(nextWaypoint)}
            </Text>
            <Text fontSize="sm" textAlign="right" width="30%" marginRight="10px">
                {`${formatTtoFromSecondsWithLiterals(nextWaypoint.targetTimeOver)}`}
            </Text>
            <IconButton minWidth={0} variant="ghost" aria-label={t("editSegment")}>
                <Icon icon="penWithBox" size={3.5} />
            </IconButton>
        </HStack>
    );
};
