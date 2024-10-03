import { FormControl, FormLabel, Tag } from "@volocopter/design-library-react";
import { useAltitudeReferenceTabField } from "./hooks/useAltitudeReferenceTabField";
import { useWaypointsTranslation } from "./translations";

type AltitudeReferenceTabProps = {
    setIsRefAltitudeSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AltitudeReferenceTabField = (props: AltitudeReferenceTabProps) => {
    const { setIsRefAltitudeSelected } = props;
    const { selectedReference, setSelectedReference } = useAltitudeReferenceTabField("AMSL");
    const handleClick = (value: string) => {
        setSelectedReference(value);
        setIsRefAltitudeSelected(value === "AGL");
    };
    const { t } = useWaypointsTranslation();

    return (
        <FormControl>
            <FormLabel>{t("fields.altitudeReference")}</FormLabel>
            <Tag
                colorScheme="gray-subtle"
                isSelected={selectedReference === "AMSL"}
                onClick={() => handleClick("AMSL")}
            >
                AMSL
            </Tag>
            <Tag
                marginLeft={2}
                colorScheme="gray-subtle"
                isSelected={selectedReference === "AGL"}
                onClick={() => handleClick("AGL")}
            >
                AGL
            </Tag>
        </FormControl>
    );
};
