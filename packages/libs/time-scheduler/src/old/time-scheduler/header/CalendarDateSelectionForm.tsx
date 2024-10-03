import { Button, Flex, Icon } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { useTranslations } from "../translations/useTranslations";
import { useDateSelectionForm } from "./useDateSelectionForm";

export type CreateCalendarType = {
    goToDate: Date;
};

const CalendarDateSelectionForm = () => {
    const { dispatch } = useTimeSchedulerState();
    const { t } = useTranslations();

    const { FormControl, dateSelectionFormSchema } = useDateSelectionForm();

    return (
        <FormProvider
            formId="dateSelectionForm"
            schema={dateSelectionFormSchema()}
            formType="create"
            onCreate={async (formData: CreateCalendarType) => {
                const data = {
                    goToDate: formData.goToDate,
                };
                dispatch({
                    type: "zoom",
                    zoomFactor: 1400,
                    leftOffset: 0,
                    mouseCursorOffset: 0,
                });
                dispatch({ type: "setStartDate", startDate: data.goToDate });
            }}
        >
            <FormControl fieldName="goToDate" />
            <Flex justifyContent="flex-end">
                <Button
                    type="submit"
                    form="dateSelectionForm"
                    leftIcon={<Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                >
                    {t("go")}
                </Button>
            </Flex>
        </FormProvider>
    );
};

export { CalendarDateSelectionForm };
