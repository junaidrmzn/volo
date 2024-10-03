import { useMemo } from "react";
import { useGetFullEnvelopeValidationQuery, useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { createFormControl, number, object } from "@voloiq/form";
import { useGetAircraftType, useGetRouteFullEnergy } from "../../api-hooks";
import { usePatchStateOfChargeSettings } from "../../api-hooks/route/patchStateOfChargeSettings";
import { useFlightPlanningTranslation } from "../../translations";
import { AIRCRAFT_TYPE } from "../../utils";

type UseStateOfChargeSettingsOptions = {
    routeOptionId: number;
    routeId: number;
};
export const useStateOfChargeSettings = (options: UseStateOfChargeSettingsOptions) => {
    const { routeOptionId, routeId } = options;
    const { t: translate } = useFlightPlanningTranslation();

    const { data: routeOptionQueryData } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const aircraftTypeId = routeOptionQueryData && routeOptionQueryData.aircraftTypeId;
    const { data: aircraftTypeQueryData } = useGetAircraftType({
        routeOptionId,
        aircraftTypeId,
        enabled: !!aircraftTypeId,
    });

    const { clearFullEnergyCache } = useGetRouteFullEnergy(routeId);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId });
    const { patchStateOfChargeSettingsAsync } = usePatchStateOfChargeSettings(routeId);

    const isTakeoffMassNotEditable = (aircraftTypeQueryData &&
        aircraftTypeQueryData.productLine.toUpperCase() === AIRCRAFT_TYPE.VoloRegion) as boolean;

    function onEditSettingsCallback() {
        clearFullEnergyCache();
        clearFullEnvelopeValidationCache();
    }

    const editSocSettingsSchema = useMemo(
        () =>
            object({
                windSpeed: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Wind Speed" }))
                    .max(23, translate("common.maxError", { max: "23", field: "Wind Speed" }))
                    .label(translate("stateOfCharge.settings.windSpeed")),
                windDirection: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Wind Direction" }))
                    .max(360, translate("common.maxError", { max: "360", field: "Wind Direction" }))
                    .label(translate("stateOfCharge.settings.windDirection")),
                takeoffMass: number()
                    .required(translate("common.requiredError"))
                    .min(500, translate("common.minError", { min: "500", field: "Take-Off Mass" }))
                    .max(5000, translate("common.maxError", { max: "5000", field: "Take-Off Mass" }))
                    .label(translate("stateOfCharge.settings.takeoffMass")),
                batteryCycles: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Battery Cycles" }))
                    .max(10_000, translate("common.maxError", { max: "10000", field: "Battery Cycles" }))
                    .label(translate("stateOfCharge.settings.batteryCycles")),
                airDensity: number()
                    .required(translate("common.requiredError"))
                    .min(0.5, translate("common.minError", { min: "0.5", field: "Air Density" }))
                    .max(2, translate("common.maxError", { max: "2", field: "Air Density" }))
                    .label(translate("stateOfCharge.settings.airDensity")),
                ambientTemperature: number()
                    .required(translate("common.requiredError"))
                    .min(-50, translate("common.minError", { min: "-50", field: "Ambient Temperature" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Ambient Temperature" }))
                    .label(translate("stateOfCharge.settings.ambientTemperature")),
                csflEnergyOverhead: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "CSFL Energy Overhead" }))
                    .max(100, translate("common.maxError", { max: "100", field: "CSFL Energy Overhead" }))
                    .label(translate("stateOfCharge.settings.csflEnergyOverhead"))
                    .default(10),
                pdmTwoEfficiencyLoss: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "PDM2 Efficiency Loss" }))
                    .max(100, translate("common.maxError", { max: "100", field: "PDM2 Efficiency Loss" }))
                    .label(translate("stateOfCharge.settings.pdmTwoEfficiencyLoss")),
                maxTimeToCsfl: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Max Time To CSFL" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Max Time To CSFL" }))
                    .label(translate("stateOfCharge.settings.maxTimeToCsfl")),
                transitionAltitude: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Transition Altitude" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Transition Altitude" }))
                    .label(translate("stateOfCharge.settings.transitionAltitude")),
                airspeedCsfl: number()
                    .required(translate("common.requiredError"))
                    .min(10, translate("common.minError", { min: "10", field: "Airspeed CSFL" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Airspeed CSFL" }))
                    .label(translate("stateOfCharge.settings.airspeedCsfl")),
                descendAngleCsfl: number()
                    .required(translate("common.requiredError"))
                    .min(3, translate("common.minError", { min: "3", field: "Descend Angle CSFL" }))
                    .max(89, translate("common.maxError", { max: "89", field: "Descend Angle CSFL" }))
                    .label(translate("stateOfCharge.settings.descendAngleCsfl")),
                climbTakeoff: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Takeoff Climbspeed" }))
                    .max(4, translate("common.maxError", { max: "4", field: "Takeoff Climbspeed" }))
                    .label(translate("stateOfCharge.settings.climbTakeoff")),
                climbTouchDown: number()
                    .required(translate("common.requiredError"))
                    .min(-4, translate("common.minError", { min: "-4", field: "Touchdown Climbspeed" }))
                    .max(0, translate("common.maxError", { max: "0", field: "Touchdown Climbspeed" }))
                    .label(translate("stateOfCharge.settings.climbTouchDown")),
                maxClimbRate: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Max Climbrate" }))
                    .max(1000, translate("common.maxError", { max: "1000", field: "Max Climbrate" }))
                    .label(translate("stateOfCharge.settings.maxClimbRate")),
                maxDescendRate: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Max Descendrate" }))
                    .max(1000, translate("common.maxError", { max: "1000", field: "Max Descendrate" }))
                    .label(translate("stateOfCharge.settings.maxDescendRate")),
                loiterAltitude: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Loiter Altitude" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Loiter Altitude" }))
                    .label(translate("stateOfCharge.settings.loiterAltitude")),
                loiterTime: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Loiter Time" }))
                    .max(60, translate("common.maxError", { max: "60", field: "Loiter Time" }))
                    .label(translate("stateOfCharge.settings.loiterTime")),
                loiterTimeCsfl: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Loiter Time for CSFL" }))
                    .max(60, translate("common.maxError", { max: "60", field: "Loiter Time for CSFL" }))
                    .label(translate("stateOfCharge.settings.loiterTimeCsfl")),
                batteryCapacityOrig: number()
                    .required(translate("common.requiredError"))
                    .max(200, translate("common.maxError", { max: "200", field: "Gross Battery Capacity" }))
                    .label(translate("stateOfCharge.settings.batteryCapacityOrig"))
                    .test(
                        "min",
                        translate("common.minError", {
                            min: "Final Reserve and unusable Energy",
                            field: "Gross Battery Capacity",
                        }),
                        (value, context) =>
                            value !== undefined &&
                            value >= context.parent.finalReserve + context.parent.unusableEnergy &&
                            value >= 0
                    ),
                unusableEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Unusable Energy" }))
                    .max(200, translate("common.maxError", { max: "200", field: "Unusable Energy" }))
                    .label(translate("stateOfCharge.settings.unusableEnergy"))
                    .default(3.5),
                finalReserve: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Final Reserve" }))
                    .max(200, translate("common.maxError", { max: "200", field: "Final Reserve" }))
                    .label(translate("stateOfCharge.settings.finalReserve"))
                    .default(2.5),
                integrationTimeStepsSeconds: number()
                    .required(translate("common.requiredError"))
                    .min(1, translate("common.minError", { min: "1", field: "Integration Time Steps" }))
                    .max(120, translate("common.maxError", { max: "120", field: "Integration Time Steps" }))
                    .label(translate("stateOfCharge.settings.integrationTimeStepsSeconds")),
                departureTaxiSpeed: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Departure Taxi Speed" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Departure Taxi Speed" }))
                    .label(translate("stateOfCharge.settings.departureTaxiSpeed"))
                    .default(15),
                departureTaxiDistance: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Departure Taxi Distance" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Departure Taxi Distance" }))
                    .label(translate("stateOfCharge.settings.departureTaxiDistance"))
                    .default(50),
                arrivalTaxiSpeed: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Arrival Taxi Speed" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Arrival Taxi Speed" }))
                    .label(translate("stateOfCharge.settings.arrivalTaxiSpeed"))
                    .default(15),
                arrivalTaxiDistance: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Arrival Taxi Distance" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Arrival Taxi Distance" }))
                    .label(translate("stateOfCharge.settings.arrivalTaxiDistance"))
                    .default(50),
                discretionaryEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Discretionary Energy" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Discretionary Energy" }))
                    .label(translate("stateOfCharge.settings.discretionaryEnergy"))
                    .default(0),
                additionalEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Additional Energy" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Additional Energy" }))
                    .label(translate("stateOfCharge.settings.additionalEnergy"))
                    .default(0),
                extraEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Extra Energy" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Extra Energy" }))
                    .label(translate("stateOfCharge.settings.extraEnergy"))
                    .default(0),
                contingencyEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Contingency Energy" }))
                    .max(100, translate("common.maxError", { max: "100", field: "Contingency Energy" }))
                    .label(translate("stateOfCharge.settings.contingencyEnergy"))
                    .default(10),
                goAroundEnergy: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Go Around Energy" }))
                    .max(999, translate("common.maxError", { max: "999", field: "Go Around Energy" }))
                    .label(translate("stateOfCharge.settings.goAroundEnergy"))
                    .default(0),
                horizontalObstacleClearance: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Horizontal Obstacle Clearance" }))
                    .label(translate("stateOfCharge.settings.horizontalObstacleClearance")),
                verticalObstacleClearance: number()
                    .required(translate("common.requiredError"))
                    .min(0, translate("common.minError", { min: "0", field: "Vertical Obstacle Clearance" }))
                    .label(translate("stateOfCharge.settings.verticalObstacleClearance")),
            }),
        [translate]
    );
    const FormControl = createFormControl<typeof editSocSettingsSchema>();
    return {
        FormControl,
        editSocSettingsSchema,
        patchStateOfChargeSettingsAsync,
        isTakeoffMassNotEditable,
        onEditSettingsCallback,
    };
};
