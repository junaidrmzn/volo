import type { Feature } from "@turf/turf";
import { Divider, Flex, Text, VStack } from "@volocopter/design-library-react";
import type { AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import { METERS_TO_FEET } from "../../../utils";

type AirspaceListItemProps = { airspace: Feature | AirspaceFeatureAllOf };

const displayAltitude = (limit: { value: number; uom: string }) => {
    return `${Math.round(limit.value * METERS_TO_FEET)} ft`;
};

export const AirspaceListItem = (props: AirspaceListItemProps) => {
    const { airspace } = props;

    return (
        <VStack px={3} width="100%" textAlign="left" alignItems="left" role="listitem">
            <Text>
                {airspace.properties!.name} - {airspace.properties!.designator}
            </Text>
            <Flex>
                <Text fontSize="sm" width="25%">
                    Type: {airspace.properties!.type || "-"}
                </Text>
                <Text fontSize="sm" flexGrow={1}>
                    Altitude: {displayAltitude(airspace.properties!.lowerLimit)} -{" "}
                    {displayAltitude(airspace.properties!.upperLimit)}
                </Text>
            </Flex>
            <Flex>
                <Text fontSize="sm"> Classification: {airspace.properties!.classification || "n/a"}</Text>
            </Flex>
            <Divider />
        </VStack>
    );
};
