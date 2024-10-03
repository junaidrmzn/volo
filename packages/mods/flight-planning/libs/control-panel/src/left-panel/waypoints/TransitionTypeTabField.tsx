import { FormControl, FormLabel, HStack, Tag } from "@volocopter/design-library-react";
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
                    isSelected={selectedTransitionType === "fly-by"}
                    onClick={() => handleTagClick("fly-by")}
                >
                    {t("fields.transitionTypeFields.flyBy")}
                </Tag>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedTransitionType === "fly-over"}
                    onClick={() => handleTagClick("fly-over")}
                >
                    {t("fields.transitionTypeFields.flyOver")}
                </Tag>
            </HStack>
        </FormControl>
    );
};
