import "@volocopter/design-library-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
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
import { formatUTCDate } from "@voloiq/utils";
import { useTestPointAttemptModalTranslation } from "../translations/useTestPointAttemptModalTranslation";
import { useTestPointAttemptStatusWorkflow } from "./useTestPointAttemptStatusWorkflow";

const getSelectValue = <T extends string>(options: SelectOption<T | undefined>[], value?: string) => {
    if (value) {
        return options.find((option) => option.value === value);
    }
    return null;
};

export const useTestPointAttemptModalForm = (testPointAttempt?: TestPointAttempt) => {
    const [editedTestPointAttempt, setEditedTestPointAttempt] = useState<TestPointAttempt | TestPointAttemptInsert>(
        testPointAttempt || { ftoId: "", date: "" }
    );
    const { t } = useTestPointAttemptModalTranslation();

    const {
        getCanEditPlanningStatus,
        onPanningStatusChange,
        getCanEditFlightTestStatus,
        onFlightStatusChange,
        getCanEditFlightStatus,
        onFlightTestStatusChange,
        getCanEditEngineeringStatus,
        onEngineeringStatusChange,
        getCanEditEngineeringAction,
        onEngineeringActionChange,
    } = useTestPointAttemptStatusWorkflow(setEditedTestPointAttempt, editedTestPointAttempt);

    const getFtoIdProps = () => {
        return {
            onChange: (data: ChangeEvent<HTMLInputElement>) =>
                setEditedTestPointAttempt((previousState) => ({ ...previousState, ftoId: data.target.value })),
            value: editedTestPointAttempt?.ftoId,
            isDisabled: !!testPointAttempt?.ftoId,
        };
    };

    const getDateProps = () => {
        return {
            onChange: (data?: Date) => {
                if (data) {
                    setEditedTestPointAttempt((previousState) => ({
                        ...previousState,
                        date: formatUTCDate(data, "yyyy-MM-dd", true),
                    }));
                }
            },
            value: editedTestPointAttempt.date ? new Date(editedTestPointAttempt.date) : undefined,
            isDisabled: !!testPointAttempt?.date,
        };
    };

    const getPanningStatusProps = () => {
        const options: SelectOption<PlanningStatus | undefined>[] = [
            {
                label: t("form.Planning Status.PLANNED"),
                value: "PLANNED",
            },
            {
                label: t("form.Planning Status.READY"),
                value: "READY",
            },
            {
                label: t("form.Planning Status.IN WORK"),
                value: "IN WORK",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];

        return {
            onChange: onPanningStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.planningStatus),
            isDisabled: !getCanEditPlanningStatus(),
            options,
        };
    };

    const getFlightStatusProps = () => {
        const options: SelectOption<FlightStatus | undefined>[] = [
            {
                label: t("form.Flight Status.ATTEMPTED"),
                value: "ATTEMPTED",
            },
            {
                label: t("form.Flight Status.EXECUTED"),
                value: "EXECUTED",
            },
            {
                label: t("form.Flight Status.NOT EXECUTED"),
                value: "NOT EXECUTED",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onFlightStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.flightStatus),
            isDisabled: !getCanEditFlightStatus(),
            options,
        };
    };

    const getFlightTestStatusProps = () => {
        const options: SelectOption<FlightTestStatus | undefined>[] = [
            {
                label: t("form.Flight Test Evaluation Status.DATA ANALYSIS"),
                value: "DATA ANALYSIS",
            },
            {
                label: t("form.Flight Test Evaluation Status.FAIL"),
                value: "FAIL",
            },
            {
                label: t("form.Flight Test Evaluation Status.PASS"),
                value: "PASS",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onFlightTestStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.flightTestStatus),
            isDisabled: !getCanEditFlightTestStatus(),
            options,
        };
    };

    const getEngineeringStatusProps = () => {
        const options: SelectOption<EngineeringStatus | undefined>[] = [
            { label: t("form.Engineering Status.NOT ACCEPTED"), value: "NOT ACCEPTED" },
            { label: t("form.Engineering Status.COMPLETED - FAIL"), value: "COMPLETED - FAIL" },
            { label: t("form.Engineering Status.COMPLETED - PASS"), value: "COMPLETED - PASS" },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onEngineeringStatusChange,
            value: getSelectValue(options, editedTestPointAttempt.engineeringStatus),
            isDisabled: !getCanEditEngineeringStatus(),
            options,
        };
    };
    const getEngineeringActionProps = () => {
        const options: SelectOption<EngineeringAction | undefined>[] = [
            {
                label: t("form.Engineering Action.CANCEL"),
                value: "CANCEL",
            },
            {
                label: t("form.Engineering Action.Repeat Test Point"),
                value: "REPEAT TEST POINT",
            },
            {
                label: t("form.None"),
                value: undefined,
            },
        ];
        return {
            onChange: onEngineeringActionChange,
            value: getSelectValue(options, editedTestPointAttempt.engineeringAction),
            isDisabled: !getCanEditEngineeringAction(),
            options,
        };
    };

    const isValidTestpointAttempt = editedTestPointAttempt?.ftoId && editedTestPointAttempt?.date;

    return {
        getFtoIdProps,
        getDateProps,
        getPanningStatusProps,
        getFlightStatusProps,
        getFlightTestStatusProps,
        getEngineeringStatusProps,
        getEngineeringActionProps,
        editedTestPointAttempt: { ...editedTestPointAttempt, date: editedTestPointAttempt.date || "" },
        setEditedTestPointAttempt,
        isValidTestpointAttempt,
    };
};
