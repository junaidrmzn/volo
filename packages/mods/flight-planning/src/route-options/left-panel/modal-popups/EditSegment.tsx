import { Box, HStack, Input, InputGroup, Text } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq-typescript-api/flight-planning-types/dist";
import { SegmentConnectionType } from "@voloiq/flight-planning-api/v1";
import { useSegment } from "../../custom-hooks/useSegment";
import { FloatingModal } from "../generic/FloatingModal";
import { SegmentField } from "../generic/SegmentField";
import { useRouteOptionMetaTranslation } from "../route-option-meta/translations";

type EditSegmentProps = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    waypoint?: Waypoint;
    nextWaypoint?: Waypoint;
    distanceToNextWayPoint?: number;
};

export const EditSegment = (props: EditSegmentProps) => {
    const { waypoint, nextWaypoint, distanceToNextWayPoint, isOpen, onClose } = props;
    const { curveRadius, setCurveRadius, connectionType, setConnectionType } = useSegment();
    const { t } = useRouteOptionMetaTranslation();

    const handleSegmentConnectionType = (type: SegmentConnectionType) => {
        setConnectionType(type);
    };

    return (
        <FloatingModal
            isOpen={isOpen}
            onClose={() => onClose(false)}
            size="sm"
            title={t("edit")}
            subTitle={t("common.segment")}
            saveTitle={t("common.done")}
            cancelTitle={t("common.cancel")}
            hasFooter
        >
            <Text fontSize="sm" fontWeight="bold" m="2">
                {t("editSegment.segmentFrom")} {waypoint?.name} - {nextWaypoint?.name}
            </Text>
            <HStack display="flex" m="2">
                <Box>
                    <Text fontSize="xs" color="grey" fontWeight="bold">
                        {t("editSegment.distance")} ({t("editSegment.segment")})
                    </Text>
                    <Text fontSize="xs">
                        {distanceToNextWayPoint} {t("editSegment.nm")}
                    </Text>
                </Box>
                <Box style={{ marginLeft: "auto" }}>
                    <Text fontSize="xs" color="grey" fontWeight="bold">
                        {t("editSegment.distance")} ({t("editSegment.pointToPoint")})
                    </Text>
                    <Text fontSize="xs">
                        {waypoint?.alt} {t("editSegment.nm")}
                    </Text>
                </Box>
            </HStack>
            <Box m="2" mb="4">
                <Text mb="2" fontSize="xs" fontWeight="bold" color="grey">
                    {t("editSegment.typeOfConnection")}
                </Text>
                <SegmentField
                    selectedConnection={connectionType ?? "direct"}
                    onConnectionChange={handleSegmentConnectionType}
                />
            </Box>
            <Box m="2" mb="4">
                <Text fontWeight="bold" color="grey" fontSize="xs" mb="2">
                    {t("editSegment.curveRadius")}
                </Text>
                <InputGroup size="md">
                    <Input
                        aria-label={t("editSegment.curveRadius")}
                        fontSize="xs"
                        variant="outline"
                        placeholder="Input value"
                        onChange={(event) => setCurveRadius(event.target.value)}
                        value={curveRadius ?? ""}
                    />
                </InputGroup>
            </Box>
        </FloatingModal>
    );
};
