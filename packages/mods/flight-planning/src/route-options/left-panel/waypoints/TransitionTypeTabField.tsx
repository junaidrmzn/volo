import { FormControl, FormLabel, HStack, Tag } from "@volocopter/design-library-react";
import { WaypointTransition, WaypointTransitionType } from "@voloiq/flight-planning-api/v1";
import { useWaypointsTranslation } from "./translations";

type TransitionTypeTabFieldProps = {
    onTransitionTypeChange: (transitionType: WaypointTransitionType) => void;
    selectedTransitionType: WaypointTransitionType;
};

export const TransitionTypeTabField = (props: TransitionTypeTabFieldProps) => {
    const { onTransitionTypeChange, selectedTransitionType } = props;
    const { t } = useWaypointsTranslation();
    const handleTagClick = (type: WaypointTransitionType) => {
        onTransitionTypeChange(type);
    };

    return (
        <FormControl>
            <FormLabel>{t("fields.transitionType")}</FormLabel>
            <HStack spacing={2}>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedTransitionType === WaypointTransition.flyBy}
                    onClick={() => handleTagClick(WaypointTransition.flyBy)}
                >
                    {t("fields.transitionTypeFields.flyBy")}
                </Tag>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedTransitionType === WaypointTransition.flyOver}
                    onClick={() => handleTagClick(WaypointTransition.flyOver)}
                >
                    {t("fields.transitionTypeFields.flyOver")}
                </Tag>
            </HStack>
        </FormControl>
    );
};
