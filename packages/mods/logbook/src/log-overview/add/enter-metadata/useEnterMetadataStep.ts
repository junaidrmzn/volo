import { useStepsContext } from "@volocopter/steps-react";
import { useEffect, useState } from "react";
import type { FormValues } from "@voloiq/form";
import { useGetAllAircrafts, useGetAllCrewMembers, useGetAllLocations } from "@voloiq/logbook-api/v6";
import type { LogInsert } from "@voloiq/logbook-api/v6";
import { mergeServiceStates } from "../../../libs/logbook/mergeServiceStates";
import type { ProductLine } from "../select-aircraft/SelectProductLineStep";
import { createLogInsertFromFormObject } from "./logMapper";
import { useEnterMetadataStepSchema } from "./useEnterMetadataStepSchema";

type UseEnterMetadataStepProps = {
    formId: string;
    selectedProductLine: ProductLine;
    setLogInsertData: (logInsert: LogInsert) => void;
};

export type ReminderModalData = {
    isOpen: boolean;
    hasBeenConfirmed: boolean;
    selectedDateTime?: Date;
};

const isDatePickerDefault = (date: Date) => {
    return (
        date.getUTCHours() === 12 &&
        date.getUTCMinutes() === 0 &&
        date.getUTCSeconds() === 0 &&
        date.getUTCMilliseconds() === 0
    );
};

export const useEnterMetadataStep = (props: UseEnterMetadataStepProps) => {
    const { formId, selectedProductLine, setLogInsertData } = props;
    const { nextStep, setCurrentFormId } = useStepsContext();
    type CreateLogSchema = typeof createLogSchema;
    const [reminderModalData, setReminderModalData] = useState<ReminderModalData>({
        isOpen: false,
        hasBeenConfirmed: false,
    });

    const {
        aircrafts: aircraftData,
        error: aircraftError,
        state: aircraftState,
    } = useGetAllAircrafts({
        filterSet: {
            filters: [
                {
                    type: "select",
                    propertyName: "productLine",
                    displayName: "Product line",
                    value: { value: selectedProductLine },
                    isActive: true,
                },
            ],
        },
    });
    const { locations: locationData, error: locationError, state: locationState } = useGetAllLocations();
    const { crewMembers: crewMemberData, error: crewMemberError, state: crewMemberState } = useGetAllCrewMembers();

    const state = mergeServiceStates([aircraftState, locationState, crewMemberState]);
    const createLogSchema = useEnterMetadataStepSchema(aircraftData, locationData, crewMemberData);

    useEffect(() => setCurrentFormId(formId), [formId, setCurrentFormId]);

    const onSubmitActions = (formData: FormValues<CreateLogSchema>) => {
        if (isDatePickerDefault(formData.date) && !reminderModalData.hasBeenConfirmed) {
            setReminderModalData((previousState) => ({
                ...previousState,
                isOpen: true,
                selectedDateTime: formData.date,
            }));
        } else if (crewMemberData) {
            setLogInsertData(createLogInsertFromFormObject<CreateLogSchema>(formData, crewMemberData));
            nextStep();
        }
    };

    return {
        onSubmitActions,
        createLogSchema,
        state,
        setReminderModalData,
        reminderModalData,
        aircraft: {
            aircraftData,
            aircraftError,
            aircraftState,
        },
        location: {
            locationData,
            locationError,
            locationState,
        },
        crewMember: {
            crewMemberData,
            crewMemberError,
            crewMemberState,
        },
    };
};
