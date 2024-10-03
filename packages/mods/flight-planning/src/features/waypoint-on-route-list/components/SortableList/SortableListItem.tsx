import { HStack, Icon, IconButton, ListIcon, Text, useColorModeValue } from "@volocopter/design-library-react";
import _ from "lodash";
import { formatTtoFromSeconds } from "../../../../utils";
import type { SortableListItemProps } from "./types";

export const SortableListItem = (props: SortableListItemProps) => {
    const { item, onClick, isDraggable } = props;
    const bgColor = useColorModeValue("gray.200", "gray.700");

    const waypointName = _.truncate(`WP${item.routeSequenceIndex} - ${item.name}`, { length: 20 });

    return (
        <HStack padding="1px 4px 1px 8px" bgColor={item.routeSequenceIndex % 2 === 0 ? bgColor : "transparent"}>
            {isDraggable ? (
                <ListIcon as={() => <Icon icon="bars" />} cursor="grab" />
            ) : (
                <ListIcon as={() => <Icon icon="voloport" />} cursor="not-allowed" />
            )}
            <Text fontSize="sm" textAlign="left" width="65%">
                {waypointName}
            </Text>
            <Text fontSize="sm" textAlign="right" width="25%">{`+${formatTtoFromSeconds(item.targetTimeOver)}`}</Text>
            <IconButton
                data-testid={`waypoints-list-show-detail-${item.routeSequenceIndex}-btn`}
                variant="ghost"
                aria-label={item.name}
                onClick={() => onClick(item.routeSequenceIndex)}
            >
                <Icon icon="chevronRight" />
            </IconButton>
        </HStack>
    );
};
