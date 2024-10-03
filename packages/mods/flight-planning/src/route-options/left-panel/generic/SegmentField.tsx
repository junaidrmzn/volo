import { FormControl, HStack, Tag, useColorModeValue } from "@volocopter/design-library-react";
import { SegmentConnection, SegmentConnectionType } from "@voloiq/flight-planning-api/v1";
import { useRouteOptionMetaTranslation } from "../route-option-meta/translations";

type SegmentFieldProps = {
    onConnectionChange: (connectionType: SegmentConnectionType) => void;
    selectedConnection: SegmentConnectionType;
};

export const SegmentField = (props: SegmentFieldProps) => {
    const { selectedConnection, onConnectionChange } = props;
    const { t } = useRouteOptionMetaTranslation();
    const handleTagClick = (type: SegmentConnectionType) => {
        onConnectionChange(type);
    };
    const white = useColorModeValue("white", "gray.800");
    const grey = useColorModeValue("gray.200", "gray.300");

    return (
        <FormControl>
            <HStack spacing={2}>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedConnection === SegmentConnection.direct}
                    backgroundColor={selectedConnection === SegmentConnection.direct ? white : grey}
                    onClick={() => handleTagClick(SegmentConnection.direct)}
                >
                    {t("common.typeofconnection.direct")}
                </Tag>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedConnection === SegmentConnection.arc}
                    backgroundColor={selectedConnection === SegmentConnection.arc ? white : grey}
                    onClick={() => handleTagClick(SegmentConnection.arc)}
                >
                    {t("common.typeofconnection.arc")}
                </Tag>
                <Tag
                    colorScheme="gray-subtle"
                    isSelected={selectedConnection === SegmentConnection.invert}
                    backgroundColor={selectedConnection === SegmentConnection.invert ? white : grey}
                    onClick={() => handleTagClick(SegmentConnection.invert)}
                >
                    {t("common.typeofconnection.invert")}
                </Tag>
            </HStack>
        </FormControl>
    );
};
