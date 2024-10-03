import { Box, Radio } from "@volocopter/design-library-react";
import { useGetAllAircraftTypes } from "../../../api-hooks";
import { useAircraft } from "../../custom-hooks/useAircraft";
import { FloatingModal } from "../generic/FloatingModal";
import { useRouteOptionMetaTranslation } from "../route-option-meta/translations/useRouteOptionMetaTranslation";

type SelectAircraftProps = {
    selectedAircraft: string;
    isOpen: boolean;
    onClose: () => void;
};

export const SelectAircraft = (props: SelectAircraftProps) => {
    const { isOpen, onClose, selectedAircraft } = props;
    const { data: aircraftTypes } = useGetAllAircraftTypes();
    const { selected, setSelectedAircraft } = useAircraft(selectedAircraft); // State to manage selected aircraft
    const { t } = useRouteOptionMetaTranslation();

    const handleRadioChange = (aircraftName: string) => {
        setSelectedAircraft(aircraftName);
    };

    return (
        <FloatingModal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            title={t("common.select")}
            subTitle={selected ?? ""}
            saveTitle={t("common.done")}
            cancelTitle={t("common.cancel")}
            hasFooter
        >
            {aircraftTypes?.map((aircraft) => (
                <Box key={aircraft.externalId}>
                    <Radio
                        value={aircraft.name}
                        size="sm"
                        isChecked={selected === aircraft.name}
                        onChange={() => handleRadioChange(aircraft.name)}
                    >
                        {aircraft.name}
                    </Radio>
                </Box>
            ))}
        </FloatingModal>
    );
};
