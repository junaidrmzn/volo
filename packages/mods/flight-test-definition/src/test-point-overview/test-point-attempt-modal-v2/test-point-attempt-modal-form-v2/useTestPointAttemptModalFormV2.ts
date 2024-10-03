import { useState } from "react";
import {
    EngineeringAction,
    EngineeringStatus,
    FlightTestStatus,
    TestPointAttempt,
    TestPointAttemptInsert,
} from "@voloiq/flight-test-definition-api/v2";
import { SelectOption } from "@voloiq/form";
import { useTestPointAttemptModalV2Translation } from "../translations/useTestPointAttemptModalV2Translation";
import { useTestPointAttemptStatusWorkflowV2 } from "./useTestPointAttemptStatusWorkflowV2";

const getSelectValue = <T extends string>(options: SelectOption<T | undefined>[], value?: string) => {
    if (value) {
        return options.find((option) => option.value === value);
    }
    return null;
};

export const useTestPointAttemptModalFormV2 = (testPointAttempt?: TestPointAttempt) => {
    const { t } = useTestPointAttemptModalV2Translation();
    const [editedTestPointAttempt, setEditedTestPointAttempt] = useState<TestPointAttemptInsert>(
        testPointAttempt || { ftoId: "", date: "" }
    );

    const {
        onFlightTestStatusChange,
        getCanEditFlightTestStatus,
        getCanTestPointEngineeringStatus,
        onTestPointEngineeringStatusChange,
        getCanEditTestPointEngineeringAction,
        onTestPointEngineeringActionChange,
    } = useTestPointAttemptStatusWorkflowV2(setEditedTestPointAttempt, editedTestPointAttempt);

    const getFlightTestStatusProps = () => {
        const options: SelectOption<FlightTestStatus | undefined>[] = [
            {
                label: t("form.Flight Test Status.PASS"),
                value: "PASS",
            },
            {
                label: t("form.Flight Test Status.FAIL"),
                value: "FAIL",
            },
            {
                label: t("form.Flight Test Status.DATA ANALYSIS"),
                value: "DATA ANALYSIS",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onFlightTestStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.flightTestStatus),
            isDisabled: !getCanEditFlightTestStatus,
            options,
        };
    };

    const getEngineeringStatusProps = () => {
        const options: SelectOption<EngineeringStatus | undefined>[] = [
            { label: t("form.Test Point Engineering Status.NOT ACCEPTED"), value: "NOT ACCEPTED" },
            { label: t("form.Test Point Engineering Status.COMPLETED - FAIL"), value: "COMPLETED - FAIL" },
            { label: t("form.Test Point Engineering Status.COMPLETED - PASS"), value: "COMPLETED - PASS" },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onTestPointEngineeringStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.engineeringStatus),
            isDisabled: !getCanTestPointEngineeringStatus,
            options,
        };
    };

    const getTestPointEngineeringActionProps = () => {
        const options: SelectOption<EngineeringAction | undefined>[] = [
            {
                label: t("form.Test Point Engineering Action.CANCEL"),
                value: "CANCEL",
            },
            {
                label: t("form.Test Point Engineering Action.Repeat Test Point"),
                value: "REPEAT TEST POINT",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onTestPointEngineeringActionChange,
            value: getSelectValue(options, editedTestPointAttempt.engineeringAction),
            isDisabled: !getCanEditTestPointEngineeringAction,
            options,
        };
    };

    return {
        editedTestPointAttempt,
        getFlightTestStatusProps,
        getEngineeringStatusProps,
        getTestPointEngineeringActionProps,
    };
};
