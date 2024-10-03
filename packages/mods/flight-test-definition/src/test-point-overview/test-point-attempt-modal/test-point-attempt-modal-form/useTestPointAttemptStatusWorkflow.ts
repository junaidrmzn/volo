import type { Dispatch, SetStateAction } from "react";
import type {
    EngineeringAction,
    EngineeringStatus,
    FlightStatus,
    FlightTestStatus,
    PlanningStatus,
    TestPointAttempt,
    TestPointAttemptInsert,
} from "@voloiq/flight-test-definition-api/v1";
import type { SelectOption } from "@voloiq/form";

export const useTestPointAttemptStatusWorkflow = (
    setInitialTestPointAttempt: Dispatch<SetStateAction<TestPointAttempt | TestPointAttemptInsert>>,
    testPointAttempt?: Partial<TestPointAttempt>
) => {
    const { flightStatus, planningStatus, flightTestStatus } = testPointAttempt || {};
    const getCanEditPlanningStatus = () => !!testPointAttempt?.date && !!testPointAttempt.ftoId;
    const onPanningStatusChange = (data: SelectOption<PlanningStatus | undefined> | null) => {
        if (data && data.value) {
            if (data.value !== "PLANNED") {
                setInitialTestPointAttempt((previousState) => ({
                    ...previousState,
                    planningStatus: data.value,
                    flightStatus: undefined,
                    flightTestStatus: undefined,
                    engineeringStatus: undefined,
                    engineeringAction: undefined,
                }));
            } else {
                setInitialTestPointAttempt((previousState) => ({ ...previousState, planningStatus: data?.value }));
            }
        } else {
            setInitialTestPointAttempt((previousState) => ({
                ...previousState,
                planningStatus: undefined,
                flightStatus: undefined,
                flightTestStatus: undefined,
                engineeringStatus: undefined,
                engineeringAction: undefined,
            }));
        }
    };
    const getCanEditFlightStatus = () => !!planningStatus && planningStatus === "PLANNED";
    const onFlightStatusChange = (data: SelectOption<FlightStatus | undefined> | null) => {
        if (data && data.value) {
            if (data.value !== "EXECUTED") {
                setInitialTestPointAttempt((previousState) => ({
                    ...previousState,
                    flightStatus: data.value,
                    flightTestStatus: undefined,
                    engineeringStatus: undefined,
                    engineeringAction: undefined,
                }));
            } else {
                setInitialTestPointAttempt((previousState) => ({ ...previousState, flightStatus: data?.value }));
            }
        } else {
            setInitialTestPointAttempt((previousState) => ({
                ...previousState,
                flightStatus: undefined,
                flightTestStatus: undefined,
                engineeringStatus: undefined,
                engineeringAction: undefined,
            }));
        }
    };
    const getCanEditFlightTestStatus = () => !!flightStatus && flightStatus === "EXECUTED";
    const onFlightTestStatusChange = (data: SelectOption<FlightTestStatus | undefined> | null) => {
        if (data && data.value) {
            if (data.value !== "FAIL") {
                setInitialTestPointAttempt((previousState) => ({ ...previousState, flightTestStatus: data?.value }));
            } else {
                setInitialTestPointAttempt((previousState) => ({
                    ...previousState,
                    flightTestStatus: data.value,
                    engineeringStatus: undefined,
                    engineeringAction: undefined,
                }));
            }
        } else {
            setInitialTestPointAttempt((previousState) => ({
                ...previousState,
                flightTestStatus: undefined,
                engineeringStatus: undefined,
                engineeringAction: undefined,
            }));
        }
    };
    const getCanEditEngineeringStatus = () =>
        !!flightTestStatus && (flightTestStatus === "PASS" || flightTestStatus === "DATA ANALYSIS");
    const onEngineeringStatusChange = (data: SelectOption<EngineeringStatus | undefined> | null) => {
        if (data && data.value) {
            if (data.value !== "NOT ACCEPTED") {
                setInitialTestPointAttempt((previousState) => ({
                    ...previousState,
                    engineeringStatus: data.value,
                    engineeringAction: undefined,
                }));
            } else {
                setInitialTestPointAttempt((previousState) => ({ ...previousState, engineeringStatus: data?.value }));
            }
        } else {
            setInitialTestPointAttempt((previousState) => ({
                ...previousState,
                engineeringStatus: undefined,
                engineeringAction: undefined,
            }));
        }
    };
    const getCanEditEngineeringAction = () => !!planningStatus;
    const onEngineeringActionChange = (data: SelectOption<EngineeringAction | undefined> | null) => {
        if (data && data.value) {
            setInitialTestPointAttempt((previousState) => ({ ...previousState, engineeringAction: data?.value }));
        } else {
            setInitialTestPointAttempt((previousState) => ({
                ...previousState,
                engineeringAction: undefined,
            }));
        }
    };

    return {
        getCanEditPlanningStatus,
        onPanningStatusChange,
        getCanEditFlightStatus,
        onFlightStatusChange,
        getCanEditFlightTestStatus,
        onFlightTestStatusChange,
        getCanEditEngineeringStatus,
        onEngineeringStatusChange,
        getCanEditEngineeringAction,
        onEngineeringActionChange,
    };
};
