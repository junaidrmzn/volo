import type { Dispatch, SetStateAction } from "react";
import type {
    EngineeringAction,
    EngineeringStatus,
    FlightTestStatus,
    TestPointAttempt,
    TestPointAttemptInsert,
} from "@voloiq/flight-test-definition-api/v2";
import type { SelectOption } from "@voloiq/form";

export const useTestPointAttemptStatusWorkflowV2 = (
    setInitialTestPointAttempt: Dispatch<SetStateAction<TestPointAttempt | TestPointAttemptInsert>>,
    testPointAttempt?: Partial<TestPointAttempt>
) => {
    const { processingStatus, flightTestStatus, engineeringStatus } = testPointAttempt || {};

    const getCanEditFlightTestStatus = !!processingStatus && processingStatus === "EXECUTED";
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
    const getCanTestPointEngineeringStatus =
        !!flightTestStatus &&
        (flightTestStatus === "PASS" || flightTestStatus === "DATA ANALYSIS") &&
        getCanEditFlightTestStatus;
    const onTestPointEngineeringStatusChange = (data: SelectOption<EngineeringStatus | undefined> | null) => {
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
    const getCanEditTestPointEngineeringAction =
        !!engineeringStatus && engineeringStatus === "NOT ACCEPTED" && getCanTestPointEngineeringStatus;
    const onTestPointEngineeringActionChange = (data: SelectOption<EngineeringAction | undefined> | null) => {
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
        getCanEditFlightTestStatus,
        onFlightTestStatusChange,
        getCanTestPointEngineeringStatus,
        onTestPointEngineeringStatusChange,
        getCanEditTestPointEngineeringAction,
        onTestPointEngineeringActionChange,
    };
};
