import { useToken } from "@volocopter/design-library-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    WindScenario,
    useGetFullEnergyWithWindScenarioQuery,
    useGetFullEnvelopeValidationQuery,
} from "@voloiq/flight-planning-api/v1";
import { useChartContext } from "@voloiq/graph";
import { useFlightStatusContext } from "../../../contexts/flight-status";
import { formatFullEnvelopeValidationData } from "../../../utils";
import { useSelectedRoute } from "../../selected-route";

type UseOperationalLimitsOptions = {
    windScenario: WindScenario;
    setWindScenario: Dispatch<SetStateAction<WindScenario>>;
};
export const useOperationalLimits = (options: UseOperationalLimitsOptions) => {
    const { windScenario, setWindScenario } = options;
    const { chart } = useChartContext();
    const spinnerColor = useToken("colors", "gray.700");
    const spinnerMaskColor = useToken("colors", "monochrome.100");
    const { selectedRoute } = useSelectedRoute();
    const { setFlightStatus } = useFlightStatusContext();
    const [enabled, setEnabled] = useState(false);

    const {
        isStale,
        isFetching: isFetchingFullEnvelopeValidation,
        data: fullEnvelopeValidationData,
    } = useGetFullEnvelopeValidationQuery({
        routeId: selectedRoute?.id || 0,
        enabled: !!selectedRoute?.id,
        setFlightStatus,
    });

    const { isFetching: isFetchingFullEnergyWithWindScenario } = useGetFullEnergyWithWindScenarioQuery({
        windScenario,
        routeId: selectedRoute?.id,
        enabled,
        setFlightStatus,
    });

    const { centerPointData, windScenariosData } = formatFullEnvelopeValidationData(fullEnvelopeValidationData);

    useEffect(() => {
        if (!chart) return undefined;
        if (isFetchingFullEnvelopeValidation && isStale) {
            chart.showLoading({
                type: "default",
                color: spinnerColor,
                lineWidth: 2.5,
                maskColor: spinnerMaskColor,
                text: "",
            });
            return undefined;
        }
        chart.hideLoading();

        chart.setOption({ series: [{ data: centerPointData }, { data: windScenariosData }] });

        if (!isFetchingFullEnergyWithWindScenario) {
            chart.on("click", (event) => {
                const [windSpeed, windDirection] = event.value as [number, number];
                setWindScenario({ windSpeed, windDirection });
                setEnabled(true);
            });
        }

        return () => {
            chart.off("click");
        };
    }, [
        chart,
        isFetchingFullEnvelopeValidation,
        isFetchingFullEnergyWithWindScenario,
        setWindScenario,
        setEnabled,
        spinnerColor,
        spinnerMaskColor,
        centerPointData,
        windScenariosData,
        isStale,
    ]);
};
