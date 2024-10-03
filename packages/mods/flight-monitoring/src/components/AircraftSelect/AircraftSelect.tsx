import { Box, Select } from "@volocopter/design-library-react";
import type { Dispatch, SetStateAction } from "react";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { useAircraftSelect, useAircraftSelectStyles } from "./hooks";

type AircraftSelectProps = {
    selectedAircraftId: string | null;
    setSelectedAircraftId: Dispatch<SetStateAction<string | null>>;
};

type SelectOption = {
    value: string | null;
    label: string;
};

export const AircraftSelect = (props: AircraftSelectProps) => {
    const { selectedAircraftId, setSelectedAircraftId } = props;
    const { t } = useFlightMonitoringTranslation();

    const { vtolOptions, triggerVtolFetch } = useAircraftSelect();
    const { selectStyles } = useAircraftSelectStyles();

    return (
        <Box pos="absolute" top={6} right={6} zIndex={9999} width="300px" data-testid="aircraft-select">
            <Select<SelectOption>
                onMenuOpen={triggerVtolFetch}
                onChange={(option) => {
                    if (option) {
                        setSelectedAircraftId(option.value);
                    }
                }}
                value={{
                    label: selectedAircraftId || `${t("flightMonitoring.selectAircraft")}...`,
                    value: selectedAircraftId,
                }}
                placeholder={`${t("flightMonitoring.selectAircraft")}...`}
                options={[...vtolOptions, { value: null, label: t("flightMonitoring.deselect") }]}
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                styles={selectStyles as {}}
            />
        </Box>
    );
};
