import { Box, HStack, Switch, Text } from "@volocopter/design-library-react";
import { Dispatch, SetStateAction } from "react";
import { useFlightPlanningTranslation } from "../../../../translations";
import { MarkLineReference } from "../../types";

type MissionReferenceProps = {
    markLineReference: MarkLineReference;
    setMarkLineReference: Dispatch<SetStateAction<MarkLineReference>>;
};

const onHandleChange = (options: MissionReferenceProps) => {
    const { markLineReference, setMarkLineReference } = options;

    if (markLineReference === "csfl") setMarkLineReference("waypoints");
    else setMarkLineReference("csfl");
};

export const MissionReference = (props: MissionReferenceProps) => {
    const { markLineReference, setMarkLineReference } = props;

    const { t } = useFlightPlanningTranslation();
    return (
        <Box px={12} py={6}>
            <HStack w="full" justifyContent="space-between">
                <Text size="sm"> {t("stateOfCharge.missionReferenceSelection")}: </Text>
                <HStack>
                    <Text size="sm"> {t("stateOfCharge.csfl")} </Text>
                    <Switch
                        isChecked={markLineReference === "waypoints"}
                        onChange={() => onHandleChange({ markLineReference, setMarkLineReference })}
                    />
                    <Text size="sm"> {t("stateOfCharge.waypoint")} </Text>
                </HStack>
            </HStack>
        </Box>
    );
};
