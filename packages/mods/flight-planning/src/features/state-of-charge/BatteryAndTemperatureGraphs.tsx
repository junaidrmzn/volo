import { SynchronizedCharts } from "@voloiq/graph";
import { useSelectedRoute } from "../selected-route";
import { BatteryTemperatureChart } from "./battery-temperature";
import { ChartLoadingSpinner, MissionReference, TaxiValidationMessage } from "./components";
import { VoltageDropValidationMessage } from "./components/voltage-drop-validation";
import { PowerCurveGraph } from "./power-curve";
import { useBatteryAndTemperatureGraphs } from "./useBatteryAndTemperatureGraphs";

type BatteryAndTemperatureChartsProps = {
    isModalOpen: boolean;
};

export const BatteryAndTemperatureCharts = (props: BatteryAndTemperatureChartsProps) => {
    const { isModalOpen } = props;
    const { isLoading, setIsLoading, markLineReference, setMarkLineReference, legendMapping, alwaysVisibleSeries } =
        useBatteryAndTemperatureGraphs();
    const { selectedRoute } = useSelectedRoute();

    return (
        <>
            <MissionReference markLineReference={markLineReference} setMarkLineReference={setMarkLineReference} />

            <SynchronizedCharts
                legendMappings={legendMapping}
                alwaysVisibleSeries={alwaysVisibleSeries}
                firstChart={(registerLegendClickEvent) => (
                    <PowerCurveGraph
                        registerLegendClickEvent={registerLegendClickEvent}
                        isModalOpen={isModalOpen}
                        markLineReference={markLineReference}
                        setIsLoading={setIsLoading}
                    />
                )}
                secondChart={(registerLegendClickEvent) => (
                    <BatteryTemperatureChart
                        registerLegendClickEvent={registerLegendClickEvent}
                        isModalOpen={isModalOpen}
                        setIsLoading={setIsLoading}
                        markLineReference={markLineReference}
                    />
                )}
            />

            {isLoading && <ChartLoadingSpinner />}
            {!isLoading && <TaxiValidationMessage selectedRouteId={selectedRoute?.id} />}
            {!isLoading && <VoltageDropValidationMessage selectedRouteId={selectedRoute?.id} />}
        </>
    );
};
