import { Grid } from "@volocopter/design-library-react";
import { useForm } from "@voloiq/form";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import { useDepartureArrivalForm } from "./useDepartureArrivalForm";

export type UpdateMissionScheduleFormFieldsProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

type FromChangeType = {
    originalStartDate: Date | undefined;
    originalEndDate: Date | undefined;
    changeEvent: Date;
    updateLabel: string;
};

const UpdateScheduleFormFields = (props: UpdateMissionScheduleFormFieldsProps) => {
    const { mission, onReloadList, onClose } = props;
    const { FormControl, estimatedDepartureArrivalInitialValues } = useDepartureArrivalForm({
        mission,
        onReloadList,
        onClose,
    });
    const { setValue } = useForm();

    const fromChangeHandler = (props: FromChangeType) => {
        const { originalStartDate, originalEndDate, changeEvent, updateLabel } = props;
        if (originalStartDate && originalEndDate) {
            const adjustedDate = adjustEndDateOnDateChange({
                originalStartDate,
                originalEndDate,
                adjustedStartDate: changeEvent,
            });
            if (adjustedDate) {
                setValue(updateLabel, adjustedDate);
            }
        }
    };
    return (
        <>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={3}>
                <FormControl
                    fieldName="estimatedDepartureDateTime"
                    onChange={(event) => {
                        if (event instanceof Date) {
                            fromChangeHandler({
                                originalStartDate: estimatedDepartureArrivalInitialValues.estimatedDepartureDateTime,
                                originalEndDate: estimatedDepartureArrivalInitialValues.estimatedArrivalDateTime,
                                changeEvent: event,
                                updateLabel: "estimatedArrivalDateTime",
                            });
                        }
                    }}
                />
                <FormControl fieldName="estimatedArrivalDateTime" />
            </Grid>
            <FormControl fieldName="delayReason" />
        </>
    );
};

export { UpdateScheduleFormFields };
